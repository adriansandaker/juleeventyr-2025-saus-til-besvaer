import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useUsername } from "./useUsername";
import { isReportMessage } from "@/context/types";
import { usePlatetopp } from "@/context/PlatetoppProvider";
import { useUniqueId } from "./useId";

const SOCKET_URL = "http://localhost:3030/";

export const useWebSocket = () => {
  const userId = useUniqueId();

  const [isReady, setIsReady] = useState(false);

  const { username: team } = useUsername();
  const { users, updateUsers } = usePlatetopp();

  // Use a ref to hold the actual WebSocket instance
  // This ensures we can access it without triggering re-renders
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      setIsReady(true);
    };

    socket.onmessage = (event) => handleMessage(event);

    socket.onclose = () => {
      setIsReady(false);
      updateUsers(users.filter((u) => u.userId !== userId));
    };

    socket.onerror = (event) => {
      console.log(event);
    };

    ws.current = socket;

    // Cleanup on unmount
    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = event.data;
      if (message.type === "TEMP_ACK") {
        console.log("Got ack");
      }
      try {
        const parsed = JSON.parse(message);
        if (isReportMessage(parsed)) {
          updateUsers(parsed.users);
        }
      } catch {
        console.log("Error handling it");
        /* Handle? */
      }
    },
    [updateUsers]
  );

  useEffect(() => {
    if (isReady && ws.current?.readyState === 1) {
      ws.current?.send(
        JSON.stringify({
          type: "JOIN",
          team,
          data: {
            userId,
          },
        })
      );
    }
  }, [isReady]);

  function getUserById(userId: string) {
    return users.find((user) => user.userId === userId);
  }

  const decrement = () => {
    const user = getUserById(userId);
    if (user && ws.current?.readyState === 1) {
      ws.current?.send(
        JSON.stringify({
          type: "TEMP_REPORT",
          team,
          data: {
            userId,
            currentInnstilling: user.currentInnstilling - 1,
          },
        })
      );
    }
  };

  const increment = () => {
    const user = getUserById(userId);
    if (user && ws.current?.readyState === 1) {
      ws.current?.send(
        JSON.stringify({
          type: "TEMP_REPORT",
          team,
          data: {
            userId,
            currentInnstilling: user.currentInnstilling + 1,
          },
        })
      );
    }
  };

  return { isReady, userId, increment, decrement };
};
