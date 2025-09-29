import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SSEMessage {
  message: string;
  [key: string]: any; 
}

interface SSEContextType {
  messages: SSEMessage[];
  error: string | null;
  setMessages: React.Dispatch<React.SetStateAction<SSEMessage[]>>;
}

const SSEContext = createContext<SSEContextType | undefined>(undefined);

export const useSSE = (): SSEContextType => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error("useSSE must be used within an SSEProvider");
  }
  return context;
};

interface SSEProviderProps {
  url: string;
  children: ReactNode;
}

export const SSEProvider: React.FC<SSEProviderProps> = ({ url, children }) => {
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource;

    const connect = () => {
      eventSource = new EventSource(url);

      eventSource.onmessage = (event: MessageEvent) => {
        try {
          const data: SSEMessage = JSON.parse(event.data);
          if (data.message === "Connection established") return;

          setMessages((prevMessages) => [...prevMessages, data]);
          setError(null);
        } catch (err) {
          console.error("Failed to parse SSE message:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE error:", err);
        setError("Error connecting to the SSE stream.");
        eventSource.close();

        setTimeout(connect, 8000);
      };
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [url]);

  return (
    <SSEContext.Provider value={{ messages, error, setMessages }}>
      {children}
    </SSEContext.Provider>
  );
};
