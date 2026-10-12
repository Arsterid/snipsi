"use client";

import { useSyncExternalStore } from "react";
import { Locale } from "../i18n/messages";

export function resolveLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const baseLanguage = language.trim().toLowerCase().split("-")[0];

    if (baseLanguage === "ru") {
      return "ru";
    }

    if (baseLanguage === "en") {
      return "en";
    }
  }

  return "en";
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("languagechange", onStoreChange);

  return () => {
    window.removeEventListener("languagechange", onStoreChange);
  };
}

function getSnapshot(): Locale {
  const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];

  return resolveLocale(languages);
}

function getServerSnapshot(): null {
  return null;
}

export function useBrowserLocale(): Locale | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
