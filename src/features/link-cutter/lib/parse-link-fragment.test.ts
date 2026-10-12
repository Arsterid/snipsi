import { describe, expect, it } from "vitest";

import { parseLinkFragment } from "./parse-link-fragment";

describe("parseLinkFragment", () => {
  it("returns loading when the browser value is unavailable", () => {
    expect(parseLinkFragment(null)).toEqual({
      status: "loading",
    });
  });

  it("returns empty when the URL has no fragment", () => {
    expect(parseLinkFragment("")).toEqual({
      status: "empty",
    });
  });

  it("returns empty when the fragment contains only #", () => {
    expect(parseLinkFragment("#")).toEqual({
      status: "empty",
    });
  });

  it("extracts a raw YouTube URL", () => {
    expect(parseLinkFragment("#https://youtu.be/VIDEO?si=abc123&t=42")).toEqual({
      status: "ready",
      sourceUrl: "https://youtu.be/VIDEO?si=abc123&t=42",
    });
  });

  it("preserves query parameter order and encoding", () => {
    expect(parseLinkFragment("#https://youtu.be/VIDEO?q=a%20b&si=abc&token=x+y")).toEqual({
      status: "ready",
      sourceUrl: "https://youtu.be/VIDEO?q=a%20b&si=abc&token=x+y",
    });
  });

  it("preserves a fragment belonging to the source URL", () => {
    expect(parseLinkFragment("#https://youtu.be/VIDEO?si=abc#t=42")).toEqual({
      status: "ready",
      sourceUrl: "https://youtu.be/VIDEO?si=abc#t=42",
    });
  });

  it("trims surrounding whitespace", () => {
    expect(parseLinkFragment("  #https://youtu.be/VIDEO?si=abc  ")).toEqual({
      status: "ready",
      sourceUrl: "https://youtu.be/VIDEO?si=abc",
    });
  });
});
