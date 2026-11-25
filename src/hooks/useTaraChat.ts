import { useCallback, useRef, useState } from 'react';

export interface TaraAction {
  id: string;
  type: 'open_work' | 'open_project' | 'open_popup';
  target: string;
  label: string;
}

export interface TaraMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: TaraAction[];
  isError?: boolean;
}

const ACTION_REGEX = /\[\[ACTION:([a-z_]+)(?::([a-z0-9-]+))?\|([^\]]+)\]\]/gi;

export function parseTaraOutput(rawText: string): {
  cleanText: string;
  actions: TaraAction[];
} {
  const actions: TaraAction[] = [];
  const seen = new Set<string>();

  const withoutComplete = rawText.replace(
    ACTION_REGEX,
    (_match, typeRaw: string, targetRaw: string | undefined, labelRaw: string) => {
      const normalizedType = typeRaw.toLowerCase();
      if (
        normalizedType === 'open_work' ||
        normalizedType === 'open_project' ||
        normalizedType === 'open_popup'
      ) {
        const target = (targetRaw || '').trim();
        const label = labelRaw.trim();
        const key = `${normalizedType}:${target}:${label}`;
        if (!seen.has(key) && label) {
          seen.add(key);
          actions.push({
            id: key,
            type: normalizedType,
            target,
            label,
          });
        }
      }
      return '';
    }
  );

  // Hide any incomplete trailing [[ACTION... marker while streaming
  const cleanText = withoutComplete.replace(/\[\[ACTION[^\]]*$/i, '').trimEnd();

  return { cleanText, actions };
}

export const INITIAL_TARA_GREETING: TaraMessage = {
  id: 'tara-welcome',
  role: 'assistant',
  content:
    "Namaste! I'm **Tara** ✨ Deepti Suman's portfolio guide.\n\nAsk me anything about her **AI Product Engineering** projects, **BITSoM Gen & Agentic AI PM** work, experience, or how to reach her!",
  actions: [
    {
      id: 'welcome-work',
      type: 'open_work',
      target: '',
      label: 'Explore All Projects',
    },
    {
      id: 'welcome-resume',
      type: 'open_popup',
      target: 'resume',
      label: 'View Resume',
    },
  ],
};

export function useTaraChat(currentPath: string) {
  const [messages, setMessages] = useState<TaraMessage[]>([INITIAL_TARA_GREETING]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<TaraMessage[]>(messages);
  messagesRef.current = messages;

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setError(null);
    setMessages([INITIAL_TARA_GREETING]);
  }, []);

  const sendMessage = useCallback(
    async (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      const userMsg: TaraMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
      };
      const assistantId = `a-${Date.now() + 1}`;
      const placeholderAssistant: TaraMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
      };

      const historyPayload = [
        ...messagesRef.current
          .filter((m) => m.id !== INITIAL_TARA_GREETING.id && !m.isError)
          .map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: trimmed },
      ];

      setMessages((prev) => [...prev, userMsg, placeholderAssistant]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: historyPayload,
            currentPath,
          }),
          signal: controller.signal,
        });

        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
          let errText = 'Could not reach Tara right now. Please try again.';
          try {
            if (contentType.includes('application/json')) {
              const errJson = (await response.json()) as { error?: string };
              if (errJson?.error) errText = errJson.error;
            }
          } catch {
            // fallback default error message
          }
          throw new Error(errText);
        }

        if (contentType.includes('application/json')) {
          const data = (await response.json()) as { text?: string; error?: string };
          if (data.error) {
            throw new Error(data.error);
          }
          const { cleanText, actions } = parseTaraOutput(data.text || '');
          if (!cleanText) {
            throw new Error('Tara returned an empty response. Please try again.');
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: cleanText, actions } : m
            )
          );
          return;
        }

        if (!contentType.includes('text/event-stream')) {
          throw new Error(
            'Tara could not reach the chat backend (unexpected response format). Please refresh and try again.'
          );
        }

        if (!response.body) {
          throw new Error('Streaming response body unavailable.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulatedRaw = '';

        const processEventBlock = (evt: string) => {
          const lines = evt.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const jsonStr = line.slice(5).trim();
            if (!jsonStr) continue;

            let parsed: {
              type?: 'delta' | 'done' | 'error';
              text?: string;
              error?: string;
            };
            try {
              parsed = JSON.parse(jsonStr);
            } catch {
              continue;
            }

            if (parsed.type === 'delta' && parsed.text) {
              accumulatedRaw += parsed.text;
              const { cleanText, actions } = parseTaraOutput(accumulatedRaw);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: cleanText, actions }
                    : m
                )
              );
            } else if (parsed.type === 'error') {
              throw new Error(
                parsed.error || 'Tara encountered an error generating a reply.'
              );
            }
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');

          const events = buffer.split('\n\n');
          buffer = events.pop() ?? '';

          for (const evt of events) {
            processEventBlock(evt);
          }
        }

        // Flush any trailing bytes & final buffered SSE event after EOF
        buffer += decoder.decode().replace(/\r\n/g, '\n');
        if (buffer.trim()) {
          for (const evt of buffer.split('\n\n')) {
            processEventBlock(evt);
          }
        }

        const { cleanText, actions } = parseTaraOutput(accumulatedRaw);
        if (!cleanText) {
          throw new Error('Tara returned an empty response. Please try again.');
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: cleanText, actions } : m
          )
        );
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'AbortError') {
          setMessages((prev) =>
            prev.filter((m) => m.id !== assistantId || m.content.trim().length > 0)
          );
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong talking to Tara.';
        setError(message);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: message,
                  isError: true,
                  actions: [
                    {
                      id: 'err-contact',
                      type: 'open_popup',
                      target: 'contact',
                      label: 'Contact Deepti Directly',
                    },
                  ],
                }
              : m
          )
        );
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [currentPath, isStreaming]
  );

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearChat,
    stopStreaming,
  };
}
