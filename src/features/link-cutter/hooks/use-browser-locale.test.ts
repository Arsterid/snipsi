import { describe, expect, it } from "vitest";

import { resolveLocale } from "./use-browser-locale";

describe("resolveLocale", () => {
  it("prefers the first supported language", () => {
    expect(resolveLocale(["ru-RU", "en-US"])).toBe("ru");
    expect(resolveLocale(["en-US", "ru-RU"])).toBe("en");
  });

  it("skips unsupported languages", () => {
    expect(resolveLocale(["fi-FI", "ru-RU", "en-US"])).toBe("ru");
  });

  it("matches language tags case-insensitively", () => {
    expect(resolveLocale(["RU-ru"])).toBe("ru");
    expect(resolveLocale(["EN-us"])).toBe("en");
  });

  it("falls back to English if no supported language exists", () => {
    expect(resolveLocale(["fi-FI"])).toBe("en");
    expect(resolveLocale([])).toBe("en");
  });
});
