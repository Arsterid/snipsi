"use client";

import { useEffect } from "react";
import ResultAction from "./components/result-action";
import SceneStage from "./components/scene-stage";
import UrlRibbon from "./components/url-ribbon";
import { useBrowserLocale } from "./hooks/use-browser-locale";
import { useLocationHash } from "./hooks/use-location-hash";
import { useReducedMotion } from "./hooks/use-reduced-motion";
import { useSceneTimeline } from "./hooks/use-scene-timeline";
import { messages } from "./i18n/messages";
import { parseLinkFragment } from "./lib/parse-link-fragment";
import { cleanYouTubeUrl, type CutRange, type YouTubeUrlError } from "./lib/youtube-url";

type LinkView =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; reason: YouTubeUrlError }
  | {
      status: "ready";
      originalUrl: string;
      cleanedUrl: string;
      removedSi: boolean;
      cutRanges: readonly CutRange[];
    };

function getLinkView(hash: string | null): LinkView {
  const parsed = parseLinkFragment(hash);

  if (parsed.status === "loading") {
    return { status: "loading" };
  }

  if (parsed.status === "empty") {
    return { status: "empty" };
  }

  const result = cleanYouTubeUrl(parsed.sourceUrl);

  if (!result.ok) {
    return { status: "error", reason: result.reason };
  }

  return {
    status: "ready",
    originalUrl: parsed.sourceUrl,
    cleanedUrl: result.url,
    removedSi: result.removedSi,
    cutRanges: result.cutRanges,
  };
}

export default function LinkCutter() {
  const hash = useLocationHash();
  const locale = useBrowserLocale();

  useEffect(() => {
    if (locale !== null) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const reducedMotion = useReducedMotion();

  const view = getLinkView(hash);

  const sceneKey =
    view.status === "ready" && view.removedSi
      ? JSON.stringify([view.originalUrl, view.cleanedUrl])
      : null;

  const phase = useSceneTimeline(sceneKey, reducedMotion);

  if (locale === null || view.status === "loading") {
    return (
      <div className="scene-stage__loading" aria-hidden="true">
        <span className="scene-stage__brand">
          <span className="scene-stage__brand-mark" />
          SnipSI
        </span>
      </div>
    );
  }

  const t = messages[locale];

  let dialogue: string;
  let supportingText = "";

  if (view.status === "empty") {
    dialogue = t.emptyDialogue;
    supportingText = t.emptyDescription;
  } else if (view.status === "error") {
    dialogue = t.errorDialogue;
    supportingText = t.errors[view.reason];
  } else if (!view.removedSi) {
    dialogue = t.alreadyCleanDialogue;
    supportingText = t.alreadyCleanDescription;
  } else {
    dialogue = t.dialogue[phase];

    if (phase === "complete") {
      supportingText = t.finalNote;
    }
  }

  const canCopy =
    view.status === "ready" && (!view.removedSi || phase === "reveal" || phase === "complete");

  return (
    <SceneStage phase={phase} locale={locale} dialogue={dialogue}>
      {view.status === "ready" ? (
        <>
          <UrlRibbon
            sourceUrl={view.originalUrl}
            cleanedUrl={view.cleanedUrl}
            cutRanges={view.cutRanges}
            removedSi={view.removedSi}
            phase={phase}
            originalLabel={t.originalLabel}
            cleanLabel={t.cleanLabel}
          />

          {supportingText && <p className="scene-stage__supporting">{supportingText}</p>}

          {canCopy && (
            <ResultAction
              key={view.cleanedUrl}
              url={view.cleanedUrl}
              copyLabel={t.copyLabel}
              copiedLabel={t.copiedLabel}
              copyError={t.copyError}
            />
          )}
        </>
      ) : (
        <p className="scene-stage__supporting" role={view.status === "error" ? "alert" : undefined}>
          {supportingText}
        </p>
      )}
    </SceneStage>
  );
}
