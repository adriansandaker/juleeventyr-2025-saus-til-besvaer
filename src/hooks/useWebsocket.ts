import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useUsername } from "./useUsername";
import { isReportMessage, isUserData } from "@/context/types";
import { useInterval } from "./useInterval";
import { usePlatetopp } from "@/context/PlatetoppProvider";
import { useUniqueId } from "./useId";

export const useWebSocket = () => {
  const userId = useUniqueId();

  const [isReady, setIsReady] = useState(false);

  const { username: team } = useUsername();

  const {
    currentInnstilling,
    updateUsers,
    decrement,
    updateCurrentInstilling,
  } = usePlatetopp();

  // Use a ref to hold the actual WebSocket instance
  // This ensures we can access it without triggering re-renders
  const ws = useRef<WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("http://localhost:3030/");

    // Connection opened
    socket.onopen = () => {
      setIsReady(true);
    };

    // Listen for messages
    socket.onmessage = (event) => {
      const message = event.data;

      try {
        const parsed = JSON.parse(message);
        if (isReportMessage(parsed)) {
          updateUsers(parsed.users);

          if (parsed.type === "STOVE_GUARD_ADJUSTMENT") {
            updateCurrentInstilling(
              parsed.users.find((u) => u.userId === userId)
                ?.currentInnstilling ?? 0
            );
            decrement();
          }
        }
      } catch {
        console.log("Error handling it");
        /* Handle? */
      }
    };

    // Connection closed - optional: Implement reconnect logic here
    socket.onclose = () => {
      setIsReady(false);
      console.log("WebSocket Disconnected");
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

  useEffect(() => {
    console.log("Incrementing");
    if (isReady && ws.current?.readyState === 1) {
      ws.current?.send(
        JSON.stringify({
          type: "TEMP_REPORT",
          team,
          data: {
            userId,
            currentInnstilling: currentInnstilling ?? 0,
          },
        })
      );
    } else {
      console.log("Ready state was " + ws.current?.readyState);
    }
  }, [currentInnstilling, isReady]);

  return { isReady };
};
