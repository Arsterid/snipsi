"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("hashchange", onStoreChange);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
  };
}

function getSnapshot(): string | null {
  return window.location.hash;
}

function getServerSnapshot(): string | null {
  return null;
}

export function useLocationHash(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
