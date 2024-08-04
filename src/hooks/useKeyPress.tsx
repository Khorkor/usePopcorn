import { useEffect } from "react";

export const useKeyPress = (key: string, action: () => void) => {
  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, [action, key]);
};
