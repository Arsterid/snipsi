const YOUTUBE_HOSTNAMES = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtu.be",
]);

export type CleanYouTubeUrlResult =
  | {
      ok: true;
      url: string;
      removedSi: boolean;
    }
  | {
      ok: false;
      reason:
        | "empty"
        | "invalid-url"
        | "unsupported-protocol"
        | "not-youtube"
        | "credentials-not-allowed";
    };

export function cleanYouTubeUrl(input: string): CleanYouTubeUrlResult {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return { ok: false, reason: "empty" };
  }

  let url: URL;

  try {
    url = new URL(trimmedInput);
  } catch {
    return { ok: false, reason: "invalid-url" };
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, reason: "unsupported-protocol" };
  }

  if (url.username || url.password) {
    return { ok: false, reason: "credentials-not-allowed" };
  }

  if (!YOUTUBE_HOSTNAMES.has(url.hostname) || url.port !== "") {
    return { ok: false, reason: "not-youtube" };
  }

  const removedSi = url.searchParams.has("si");

  url.searchParams.delete("si");

  return {
    ok: true,
    url: url.toString(),
    removedSi,
  };
}
