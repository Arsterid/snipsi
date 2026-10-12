import { describe, expect, it } from "vitest";

import { cleanYouTubeUrl } from "./youtube-url";

describe("cleanYouTubeUrl", () => {
  it("removes si from a youtu.be link", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?si=123")).toEqual({
      ok: true,
      url: "https://youtu.be/abc",
      removedSi: true,
    });
  });

  it("preserves other query parameters", () => {
    expect(cleanYouTubeUrl("https://www.youtube.com/watch?v=abc&si=123&t=42")).toEqual({
      ok: true,
      url: "https://www.youtube.com/watch?v=abc&t=42",
      removedSi: true,
    });
  });

  it("removes every occurrence of si", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?si=first&t=42&si=second")).toEqual({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      removedSi: true,
    });
  });

  it("reports when si was not present", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?t=42")).toEqual({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      removedSi: false,
    });
  });

  it("rejects an empty string", () => {
    expect(cleanYouTubeUrl("   ")).toEqual({
      ok: false,
      reason: "empty",
    });
  });

  it("rejects an invalid URL", () => {
    expect(cleanYouTubeUrl("not a URL")).toEqual({
      ok: false,
      reason: "invalid-url",
    });
  });

  it("rejects unsupported protocols", () => {
    expect(cleanYouTubeUrl("ftp://youtu.be/abc?si=123")).toEqual({
      ok: false,
      reason: "unsupported-protocol",
    });
  });

  it("rejects non-YouTube domains", () => {
    expect(cleanYouTubeUrl("https://example.com/video?si=123")).toEqual({
      ok: false,
      reason: "not-youtube",
    });
  });

  it("rejects deceptive domains", () => {
    expect(cleanYouTubeUrl("https://youtube.com.example.org/video?si=123")).toEqual({
      ok: false,
      reason: "not-youtube",
    });
  });

  it("rejects URLs containing credentials", () => {
    expect(cleanYouTubeUrl("https://user:password@youtube.com/watch?v=abc")).toEqual({
      ok: false,
      reason: "credentials-not-allowed",
    });
  });
});
