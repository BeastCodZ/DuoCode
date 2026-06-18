// app/error.tsx
"use client";

import Error from "@/components/Error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <Error error="generic" text={error.message} />;
}