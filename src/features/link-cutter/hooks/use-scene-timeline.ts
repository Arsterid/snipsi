"use client";

import { useEffect, useState } from "react";

export type ScenePhase =
  "intro" | "notice" | "inspect" | "explain" | "help" | "cut" | "reveal" | "complete";

type SceneSnapshot = {
  sceneKey: string;
  phase: ScenePhase;
};

const TIMELINE: ReadonlyArray<{
  phase: ScenePhase;
  at: number;
}> = [
  { phase: "notice", at: 900 },
  { phase: "inspect", at: 2100 },
  { phase: "explain", at: 3300 },
  { phase: "help", at: 7600 },
  { phase: "cut", at: 8700 },
  { phase: "reveal", at: 10100 },
  { phase: "complete", at: 11600 },
];

export function useSceneTimeline(
  sceneKey: string | null,
  reducedMotion: boolean | null
): ScenePhase {
  const [snapshot, setSnapshot] = useState<SceneSnapshot | null>(null);

  useEffect(() => {
    if (!sceneKey || reducedMotion !== false) {
      return;
    }

    const timers = TIMELINE.map(({ phase, at }) =>
      window.setTimeout(() => {
        setSnapshot({ sceneKey, phase });
      }, at)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [sceneKey, reducedMotion]);

  if (!sceneKey || reducedMotion === true) {
    return "complete";
  }

  if (reducedMotion === null || snapshot?.sceneKey !== sceneKey) {
    return "intro";
  }

  return snapshot.phase;
}
