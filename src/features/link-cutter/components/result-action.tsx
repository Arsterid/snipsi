"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type ResultActionProps = {
  url: string;
  copyLabel: string;
  copiedLabel: string;
  copyError: string;
};

type CopyStatus = "idle" | "copied" | "error";

export default function ResultAction({
  url,
  copyLabel,
  copiedLabel,
  copyError,
}: ResultActionProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  async function handleCopy() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }

      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="result-action">
      <button className="result-action__button" type="button" onClick={handleCopy}>
        {status === "copied" ? (
          <Check aria-hidden="true" className="size-5" />
        ) : (
          <Copy aria-hidden="true" className="size-5" />
        )}

        <span>{status === "copied" ? copiedLabel : copyLabel}</span>
      </button>

      {status === "error" && (
        <p className="result-action__message" role="alert">
          {copyError}
        </p>
      )}

      {status === "copied" && (
        <p className="result-action__message" role="status">
          {copiedLabel}
        </p>
      )}
    </div>
  );
}
