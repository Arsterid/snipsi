
const YOUTUBE_HOSTNAMES = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtu.be",
]);

export type YouTubeUrlError =
  | "empty"
  | "invalid-url"
  | "unsupported-protocol"
  | "not-youtube"
  | "credentials-not-allowed";

export type CutRange = Readonly<{
  start: number;
  end: number;
  text: string;
  cutCount: 1 | 2;
}>;

export type CleanYouTubeUrlResult =
  | {
      ok: true;
      url: string;
      removedSi: boolean;
      cutRanges: readonly CutRange[];
    }
  | {
      ok: false;
      reason: YouTubeUrlError;
    };

type IndexRange = {
  start: number;
  end: number;
};

type QuerySegment = {
  start: number;
  end: number;
  key: string | null;
};

function getQuerySegments(query: string): QuerySegment[] {
  const segments: QuerySegment[] = [];
  let start = 0;

  for (let index = 0; index <= query.length; index += 1) {
    if (index !== query.length && query[index] !== "&") {
      continue;
    }

    const rawSegment = query.slice(start, index);
    const key = new URLSearchParams(rawSegment).keys().next().value;

    segments.push({
      start,
      end: index,
      key: key ?? null,
    });

    start = index + 1;
  }

  return segments;
}

function mergeRanges(ranges: IndexRange[]): IndexRange[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: IndexRange[] = [];

  for (const range of sorted) {
    const previous = merged[merged.length - 1];

    if (previous && range.start <= previous.end) {
      previous.end = Math.max(previous.end, range.end);
      continue;
    }

    merged.push({ ...range });
  }

  return merged;
}

function findSiRemovalRanges(input: string): IndexRange[] {
  const queryStart = input.indexOf("?");
  const fragmentStart = input.indexOf("#");

  if (
    queryStart === -1 ||
    (fragmentStart !== -1 && queryStart > fragmentStart)
  ) {
    return [];
  }

  const queryEnd = fragmentStart === -1 ? input.length : fragmentStart;
  const query = input.slice(queryStart + 1, queryEnd);
  const segments = getQuerySegments(query);

  const siSegments = segments.filter((segment) => segment.key === "si");

  if (siSegments.length === 0) {
    return [];
  }

  const otherSegments = segments.filter(
    (segment) => segment.key !== null && segment.key !== "si",
  );

  if (otherSegments.length === 0) {
    return [{ start: queryStart, end: queryEnd }];
  }

  const ranges = siSegments.map((segment): IndexRange => {
    const hasOtherBefore = otherSegments.some(
      (other) => other.start < segment.start,
    );

    if (hasOtherBefore) {
      return {
        start: queryStart + segment.start,
        end: queryStart + 1 + segment.end,
      };
    }

    return {
      start: queryStart + 1 + segment.start,
      end: queryStart + 1 + segment.end + 1,
    };
  });

  return mergeRanges(ranges);
}

function removeRanges(input: string, ranges: readonly IndexRange[]): string {
  let cursor = 0;
  let output = "";

  for (const range of ranges) {
    output += input.slice(cursor, range.start);
    cursor = range.end;
  }

  return output + input.slice(cursor);
}

export function cleanYouTubeUrl(
  input: string,
): CleanYouTubeUrlResult {
  const source = input.trim();

  if (!source) {
    return { ok: false, reason: "empty" };
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(source);
  } catch {
    return { ok: false, reason: "invalid-url" };
  }

  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    return { ok: false, reason: "unsupported-protocol" };
  }

  if (parsedUrl.username || parsedUrl.password) {
    return { ok: false, reason: "credentials-not-allowed" };
  }

  if (
    !YOUTUBE_HOSTNAMES.has(parsedUrl.hostname) ||
    parsedUrl.port !== ""
  ) {
    return { ok: false, reason: "not-youtube" };
  }

  const ranges = findSiRemovalRanges(source);
  const url = removeRanges(source, ranges);

  const cutRanges: CutRange[] = ranges.map((range) => {
    const cutCount: CutRange["cutCount"] =
      range.end === source.length ? 1 : 2;

    return {
      ...range,
      text: source.slice(range.start, range.end),
      cutCount,
    };
  });

  return {
    ok: true,
    url,
    removedSi: cutRanges.length > 0,
    cutRanges,
  };
}
