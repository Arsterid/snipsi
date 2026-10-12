import { describe, expect, it } from "vitest";

import { cleanYouTubeUrl } from "./youtube-url";

describe("cleanYouTubeUrl", () => {
  it("removes si from a youtu.be link", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?si=123")).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc",
      removedSi: true,
    });
  });

  it("preserves other query parameters", () => {
    expect(cleanYouTubeUrl("https://www.youtube.com/watch?v=abc&si=123&t=42")).toMatchObject({
      ok: true,
      url: "https://www.youtube.com/watch?v=abc&t=42",
      removedSi: true,
    });
  });

  it("removes every occurrence of si", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?si=first&t=42&si=second")).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      removedSi: true,
    });
  });

  it("reports when si was not present", () => {
    expect(cleanYouTubeUrl("https://youtu.be/abc?t=42")).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      removedSi: false,
    });
  });

  it("rejects an empty string", () => {
    expect(cleanYouTubeUrl("   ")).toMatchObject({
      ok: false,
      reason: "empty",
    });
  });

  it("rejects an invalid URL", () => {
    expect(cleanYouTubeUrl("not a URL")).toMatchObject({
      ok: false,
      reason: "invalid-url",
    });
  });

  it("rejects unsupported protocols", () => {
    expect(cleanYouTubeUrl("ftp://youtu.be/abc?si=123")).toMatchObject({
      ok: false,
      reason: "unsupported-protocol",
    });
  });

  it("rejects non-YouTube domains", () => {
    expect(cleanYouTubeUrl("https://example.com/video?si=123")).toMatchObject({
      ok: false,
      reason: "not-youtube",
    });
  });

  it("rejects deceptive domains", () => {
    expect(cleanYouTubeUrl("https://youtube.com.example.org/video?si=123")).toMatchObject({
      ok: false,
      reason: "not-youtube",
    });
  });

  it("rejects URLs containing credentials", () => {
    expect(cleanYouTubeUrl("https://user:password@youtube.com/watch?v=abc")).toMatchObject({
      ok: false,
      reason: "credentials-not-allowed",
    });
  });

  it("preserves the original order and encoding of other parameters", () => {
    const result = cleanYouTubeUrl(
      "https://youtube.com/watch?v=abc&q=a%20b&si=123&token=x+y&t=42#comments"
    );

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtube.com/watch?v=abc&q=a%20b&token=x+y&t=42#comments",
      removedSi: true,
    });
  });

  it("plans one cut when si is the only query parameter", () => {
    const result = cleanYouTubeUrl("https://youtu.be/abc?si=123");

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc",
      cutRanges: [
        {
          text: "?si=123",
          cutCount: 1,
        },
      ],
    });
  });

  it("plans two cuts when si is the first of several parameters", () => {
    const result = cleanYouTubeUrl("https://youtu.be/abc?si=123&t=42");

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      cutRanges: [
        {
          text: "si=123&",
          cutCount: 2,
        },
      ],
    });
  });

  it("plans one cut when si is the last parameter", () => {
    const result = cleanYouTubeUrl("https://youtu.be/abc?t=42&si=123");

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?t=42",
      cutRanges: [
        {
          text: "&si=123",
          cutCount: 1,
        },
      ],
    });
  });

  it("plans two cuts when si is between other parameters", () => {
    const result = cleanYouTubeUrl("https://youtu.be/abc?v=1&si=123&t=42");

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?v=1&t=42",
      cutRanges: [
        {
          text: "&si=123",
          cutCount: 2,
        },
      ],
    });
  });

  it("removes encoded parameter names without rewriting other values", () => {
    const result = cleanYouTubeUrl("https://youtu.be/abc?q=a%20b&%73i=123&token=x+y");

    expect(result).toMatchObject({
      ok: true,
      url: "https://youtu.be/abc?q=a%20b&token=x+y",
      removedSi: true,
    });
  });
});
