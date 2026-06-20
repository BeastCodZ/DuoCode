import BackButton from "@/components/BackButton";
import Image from "next/image";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#131f24] text-white p-4">
      <div className="mx-auto max-w-4xl animate-pulse">
        {/* Real Back Button */}
        <BackButton />

        {/* Real DuoCode Logo */}
        <div className="my-4 flex justify-center">
          <Image
            src="/banner.webp" // or "/duocode.webp" depending on what you use
            alt="DuoCode"
            width={220}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </div>

        {/* Header */}
        <div className="mb-5 rounded-[40px] border-2 border-b-8 border-[#37464f] bg-[#202f36] p-8">
          <div className="flex gap-6">
            <div className="h-32 w-32 shrink-0 rounded-full border-4 border-[#58cc02]/30 bg-[#131f24]" />

            <div className="flex-1">
              <div className="h-12 w-72 rounded-xl bg-[#131f24]" />

              <div className="mt-5 flex gap-3">
                <div className="h-8 w-36 rounded-full bg-[#131f24]" />
                <div className="h-8 w-36 rounded-full bg-[#131f24]" />
                <div className="h-8 w-28 rounded-full bg-[#131f24]" />
              </div>

              <div className="mt-5 h-4 w-80 rounded-full bg-[#131f24]" />

              <div className="mt-6 flex gap-3">
                <div className="h-6 w-6 rounded bg-[#131f24]" />
                <div className="h-6 w-6 rounded bg-[#131f24]" />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-5"
            >
              <div className="h-4 w-24 rounded-full bg-[#131f24]" />
              <div className="mt-3 h-8 w-20 rounded-full bg-[#131f24]" />
              <div className="mt-3 h-3 w-24 rounded-full bg-[#131f24]" />
            </div>
          ))}
        </div>

        {/* Lower grid */}
        <div className="grid grid-cols-[1.55fr_1fr] gap-4">
          {/* Left */}
          <div className="space-y-4">
            <div className="h-48 rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />
            <div className="h-64 rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />
            <div className="h-48 rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="h-[22rem] rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />
              <div className="h-24 rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}