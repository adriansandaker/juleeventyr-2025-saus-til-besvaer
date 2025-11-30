import { useState } from "react";

export const useUniqueId = (key = "stove-id") => {
  const [id] = useState(() => {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      return stored;
    }

    // Generate new ID
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, newId);
    return newId;
  });

  return id;
};
