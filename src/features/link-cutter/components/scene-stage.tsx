import type { ReactNode } from "react";

import type { ScenePhase } from "../hooks/use-scene-timeline";
import type { Locale } from "../i18n/messages";
import Brand from "./brand";

type SceneStageProps = {
  phase: ScenePhase;
  locale: Locale;
  dialogue: string;
  children: ReactNode;
};

export default function SceneStage({ phase, locale, dialogue, children }: SceneStageProps) {
  return (
    <div className="scene-stage" data-phase={phase} lang={locale}>
      <div className="scene-stage__shade" aria-hidden="true" />

      <div className="scene-stage__content">
        <header className="scene-stage__header">
          <Brand />
        </header>

        <div className="scene-stage__dialogue" aria-live="polite" aria-atomic="true">
          {dialogue ? (
            <h1
              key={`${phase}:${dialogue}`}
              className="scene-stage__dialogue-text"
              data-dialogue-phase={phase}
            >
              {dialogue}
            </h1>
          ) : (
            <h1 className="sr-only">SnipSI</h1>
          )}
        </div>

        <div className="scene-stage__body">{children}</div>
      </div>
    </div>
  );
}
