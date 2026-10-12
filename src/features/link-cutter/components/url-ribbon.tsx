import type { CSSProperties, ReactNode } from "react";

import type { ScenePhase } from "../hooks/use-scene-timeline";
import type { CutRange } from "../lib/youtube-url";
import Magnifier from "./magnifier";
import Scissors from "./scissors";

type UrlRibbonProps = {
  sourceUrl: string;
  cleanedUrl: string;
  cutRanges: readonly CutRange[];
  removedSi: boolean;
  phase: ScenePhase;
  originalLabel: string;
  cleanLabel: string;
};

export default function UrlRibbon({
  sourceUrl,
  cleanedUrl,
  cutRanges,
  removedSi,
  phase,
  originalLabel,
  cleanLabel,
}: UrlRibbonProps) {
  const showCleanUrl = !removedSi || phase === "reveal" || phase === "complete";

  const showMagnifier = phase === "inspect" || phase === "explain" || phase === "help";

  const sourceParts: ReactNode[] = [];
  let cursor = 0;

  for (const [index, range] of cutRanges.entries()) {
    if (range.start > cursor) {
      sourceParts.push(<span key={`text-${cursor}`}>{sourceUrl.slice(cursor, range.start)}</span>);
    }

    const fragment = sourceUrl.slice(range.start, range.end);
    const isFocused = showMagnifier && index === 0;
    const isCutting = phase === "cut";

    sourceParts.push(
      <span
        key={`cut-${range.start}`}
        className={[
          "url-ribbon__cut-segment",
          isFocused ? "is-focused" : "",
          isCutting ? "is-cutting" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-cut-count={range.cutCount}
        style={{ "--cut-delay": `${index * 120}ms` } as CSSProperties}
      >
        <span className="url-ribbon__fragment-text">{fragment}</span>

        {isFocused && <Magnifier label={fragment.replace(/^[?&]+/, "").replace(/[?&]+$/, "")} />}

        {isCutting && <Scissors />}
      </span>
    );

    cursor = range.end;
  }

  if (cursor < sourceUrl.length) {
    sourceParts.push(<span key={`text-${cursor}`}>{sourceUrl.slice(cursor)}</span>);
  }

  return (
    <section className="url-ribbon" aria-label={showCleanUrl ? cleanLabel : originalLabel}>
      <p className="url-ribbon__label">{showCleanUrl ? cleanLabel : originalLabel}</p>

      <div className="url-ribbon__paper">
        <code
          key={showCleanUrl ? "clean" : "original"}
          className={["url-ribbon__text", showCleanUrl ? "url-ribbon__text--clean" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {showCleanUrl ? cleanedUrl : sourceParts}
        </code>
      </div>
    </section>
  );
}
