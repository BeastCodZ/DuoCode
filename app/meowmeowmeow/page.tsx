"use client";

import AnimateIn from "@/components/AnimateIn";
import { User } from "lucide-react";
import Image from "next/image";
import data from "@/learn/data.json";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function learn() {
  const categories = [...new Set(data.map((p) => p.category))].sort();

  return (
    <main className="min-h-screen bg-[#131f24] text-white flex items-center justify-center px-4 font-sans py-10 overflow-hidden">
      <div className="max-w-md md:max-w-5xl w-full">
        <BackButton />
        <AnimateIn direction="down" delay={0.1}>
          <div className="text-center mb-12">
            <div className="inline-block rounded-2xl border-2 border-[#37464f] bg-[#202f36] p-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={192}
                  height={192}
                  className="w-48 h-auto"
                />

                <Image
                  src="/banner.webp"
                  alt="DuoCode Banner"
                  width={128}
                  height={128}
                  className="mt-2 w-48 h-auto"
                />

                <h2 className="mt-2 text-lg font-bold text-zinc-300">
                  Your rival already solved today&apos;s problem.
                </h2>
              </div>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn direction="up" delay={0.4} className="h-full">
          <div className="h-full bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] transition-transform hover:-translate-y-1">
            <div>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="bg-[#4cbd18] p-2 rounded-2xl text-white">
                  <User size={24} />
                </span>
                <div className="flex flex-col gap-2">
                  <span>Roadmap</span>
                  <span className="text-sm text-zinc-400">
                    Track your progress and plan your learning path.
                  </span>
                </div>
              </h2>
              <div className="space-y-3 mt-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {categories.map((category) => {
                    const count = data.filter(
                      (p) => p.category === category,
                    ).length;

                    return (
                      <Link
                        href={`/learn/${encodeURIComponent(category)}`}
                        key={category}
                        className="
          group
          rounded-3xl
          border-2
          border-b-8
          border-[#37464f]
          bg-[#202f36]
          p-6
          text-left
          transition-all
          hover:-translate-y-1
          hover:border-[#58CC02]
          active:translate-y-1
          active:border-b-2
        "
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-black text-white">
                              {category}
                            </h3>

                            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-zinc-400">
                              {count} problems
                            </p>
                          </div>

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#58CC02] text-2xl font-black text-white transition-transform group-hover:translate-x-1">
                            →
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </main>
  );
}
