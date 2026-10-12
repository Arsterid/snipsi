export type ParsedLinkFragment =
  { status: "loading" } | { status: "empty" } | { status: "ready"; sourceUrl: string };

export function parseLinkFragment(hash: string | null): ParsedLinkFragment {
  if (hash === null) {
    return { status: "loading" };
  }

  const trimmedHash = hash.trim();

  const source = trimmedHash.startsWith("#") ? trimmedHash.slice(1) : trimmedHash;

  const sourceUrl = source.trim();

  if (!sourceUrl) {
    return { status: "empty" };
  }

  return {
    status: "ready",
    sourceUrl,
  };
}
