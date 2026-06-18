"use client";

import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";

type ErrorType =
  | "user-not-found"
  | "compare-not-found"
  | "not-found"
  | "custom"
  | "generic";

interface ErrorProps {
  error?: ErrorType;
  username?: string;
  usernames?: [string, string];
  text?: string;
}

export default function Error({
  error = "generic",
  username,
  usernames,
  text,
}: ErrorProps) {
  const config = {
    "user-not-found": {
      title: "User Not Found",
      subtitle:
        "The last person who typed the wrong username is still looking for it.",
      heading: "Double-check the username",
      description:
        username != null
          ? `We couldn't find @${username}. The profile may not exist or the username may be misspelled.`
          : "The profile may not exist, the spelling might be incorrect, or the user hasn't made their LeetCode profile publicly accessible.",
    },

    "compare-not-found": {
      title: "Battle Failed",
      subtitle:
        "One of your challengers never showed up.",
      heading: "Check both usernames",
      description:
        usernames != null
          ? `Unable to compare @${usernames[0]} and @${usernames[1]}. One or both usernames could not be found.`
          : "One or more of the supplied LeetCode usernames could not be found. Verify the spelling and try again.",
    },

    "not-found": {
      title: "Page Not Found",
      subtitle:
        "Looks like you wandered off the roadmap.",
      heading: "This page doesn't exist",
      description:
        "The page you're looking for may have been moved, deleted, or never existed in the first place.",
    },

    generic: {
      title: "Something Went Wrong",
      subtitle:
        "Well... that wasn't supposed to happen.",
      heading: "Unexpected Error",
      description:
        "An unexpected error occurred while processing your request. Please try again in a moment.",
    },
    custom: {
      title: text,
      subtitle:
        "Something unexpected happened.",
      heading: text,
      description:
        text || "An unexpected error occurred.",
    },
  }[error];

  return (
    <main className="min-h-screen bg-[#131f24] text-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="max-w-3xl w-full">
        <AnimateIn direction="down" delay={0.1}>
          <div className="text-center mb-10">
            <div className="inline-block rounded-2xl border-2 border-[#37464f] bg-[#202f36] p-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={192}
                  height={192}
                  className="w-40 h-auto"
                  priority
                />

                <Image
                  src="/banner.webp"
                  alt="DuoCode Banner"
                  width={180}
                  height={64}
                  className="mt-2 w-48 h-auto"
                  priority
                />

                <h2 className="mt-4 text-3xl font-black">
                  {config.title}
                </h2>

                <p className="mt-2 max-w-md text-zinc-400">
                  {config.subtitle}
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2}>
          <div className="rounded-4xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-8 text-center">
            <h3 className="text-xl font-black text-[#58CC02]">
              {config.heading}
            </h3>

            <p className="mt-4 text-zinc-300 leading-relaxed">
              {config.description}
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = "/";
                  }
                }}
                className="
                  rounded-2xl
                  border-2
                  border-b-4
                  border-[#37464f]
                  bg-[#131f24]
                  px-6
                  py-3
                  font-black
                  text-zinc-300
                  transition-all
                  hover:border-[#58CC02]
                  hover:text-white
                  active:translate-y-1
                  active:border-b-2
                "
              >
                Go Back
              </button>
            </div>
          </div>
        </AnimateIn>
      </div>
    </main>
  );
}