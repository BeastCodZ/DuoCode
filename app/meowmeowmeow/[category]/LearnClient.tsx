"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Star } from "lucide-react";

import AnimateIn from "@/components/AnimateIn";
import BackButton from "@/components/BackButton";

interface Problem {
  title: string;
  titleSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  category: string;
}

interface Props {
  category: string;
  problems: Problem[];
}

export default function LearnClient({ category, problems }: Props) {
  const storageKey = `learn-${category}`;

  const [completedSet, setCompletedSet] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();

    try {
      const raw = localStorage.getItem(storageKey);

      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  const [compact, setCompact] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(completedSet)));
  }, [completedSet, storageKey]);

  useEffect(() => {
    const listener = () => {
      setCompact(window.scrollY > 120);
    };

    window.addEventListener("scroll", listener);

    listener();

    return () => window.removeEventListener("scroll", listener);
  }, []);

  const progress = useMemo(() => {
    return (completedSet.size / Math.max(problems.length, 1)) * 100;
  }, [completedSet, problems]);

  return (
    <main className="min-h-screen bg-[#131f24] text-white pb-24">
      <div
        className={`mx-auto px-4 pt-6 ${compact ? "max-w-xl" : "max-w-5xl"}`}
      >
        <BackButton />

        {/* Sticky Header */}
        <div
          className={`
    z-50
    rounded-[2rem]
    border-2
    border-b-8
    border-[#37464f]
    bg-[#202f36]/95
    backdrop-blur-md
    transition-all
    duration-500
    ease-in-out
    ${
      compact
        ? "fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(42rem,calc(100vw-2rem))] p-4 shadow-2xl"
        : "sticky top-4 max-w-5xl mx-auto p-8"
    }
  `}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1
                className={`
                  font-black
                  capitalize
                  transition-all
                  duration-300
                  ${compact ? "text-2xl" : "text-5xl"}
                `}
              >
                {category}
              </h1>

              {!compact && (
                <p className="mt-2 text-zinc-400">
                  Complete every level to master this topic.
                </p>
              )}
            </div>

            <div className="hidden sm:flex h-16 w-16 rounded-full bg-[#58CC02] items-center justify-center border-2 border-b-4 border-[#46a302]">
              <Star fill="white" size={28} />
            </div>
          </div>

          <div className="mt-5 h-4 rounded-full overflow-hidden bg-[#131f24] border-2 border-[#37464f]">
            <div
              className="h-full bg-[#58CC02] transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-2 font-bold text-sm text-zinc-400">
            {completedSet.size} / {problems.length} completed
          </p>
        </div>

        {/* Roadmap */}
        <div className="mt-12 flex flex-col items-center">
          {problems.map((problem, index) => {
            const solved = completedSet.has(problem.titleSlug);

            const offset =
              index % 4 === 0
                ? "-translate-x-24"
                : index % 4 === 1
                  ? "translate-x-0"
                  : index % 4 === 2
                    ? "translate-x-24"
                    : "translate-x-0";

            const border = solved
              ? "border-[#46a302] bg-[#58CC02]"
              : problem.difficulty === "Easy"
                ? "border-green-500 bg-[#202f36]"
                : problem.difficulty === "Medium"
                  ? "border-yellow-400 bg-[#202f36]"
                  : "border-red-500 bg-[#202f36]";

            return (
              <AnimateIn
                key={problem.titleSlug}
                direction="up"
                delay={index * 0.03}
              >
                <div
                  className={`relative flex flex-col items-center ${offset}`}
                >
                  {index !== 0 && (
                    <div className="absolute -top-14 h-14 w-2 rounded-full bg-[#37464f]" />
                  )}

                  <button
                    onClick={() => {
                      const next = new Set(completedSet);

                      if (next.has(problem.titleSlug)) {
                        next.delete(problem.titleSlug);
                      } else {
                        next.add(problem.titleSlug);
                      }

                      setCompletedSet(next);
                    }}
                    className={`
                        group
                        relative
                        h-28
                        w-28
                        rounded-full
                        border-2
                        border-b-8
                        ${border}
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:scale-105
                        active:translate-y-1
                        active:border-b-2
                        flex
                        items-center
                        justify-center
                      `}
                  >
                    {solved ? (
                       <Star fill="white" size={28} />
                    ) : (
                      <span className="text-4xl font-black">{index + 1}</span>
                    )}
                  </button>

                  <div className="mt-4 w-64 text-center">
                    <h2 className="font-black text-lg">{problem.title}</h2>

                    <div className="mt-2 flex justify-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          problem.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-300"
                            : problem.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {problem.difficulty}
                      </span>

                      {solved && (
                        <span className="rounded-full bg-[#58CC02]/20 text-[#58CC02] px-3 py-1 text-xs font-black flex items-center gap-1">
                          <Check size={12} />
                          Solved
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        window.open(
                          problem.link,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                      className="
                          mt-3
                          inline-flex
                          items-center
                          gap-2
                          rounded-2xl
                          border-2
                          border-b-4
                          border-[#37464f]
                          bg-[#202f36]
                          px-4
                          py-2
                          font-black
                          transition-all
                          hover:border-[#58CC02]
                          hover:-translate-y-0.5
                          active:translate-y-1
                          active:border-b-2
                        "
                    >
                      <ArrowUpRight size={16} />
                      Open
                    </button>
                  </div>

                  <div className="h-12" />
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
