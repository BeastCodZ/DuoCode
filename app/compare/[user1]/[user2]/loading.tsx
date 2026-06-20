export default function Loading() {
  return (
    <main className="min-h-screen bg-[#131f24] text-white p-4 overflow-hidden">
      <div className="mb-6 h-10 w-28 rounded-2xl bg-[#202f36]" />
      <div className="mx-auto max-w-5xl animate-pulse">

        {/* VS Header */}
        <div className="mb-6 rounded-[40px] border-2 border-b-8 border-[#37464f] bg-[#202f36] p-6 md:p-8">
          <div className="flex items-center justify-between">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4"
              >
                <div className="h-32 w-32 rounded-full border-4 border-zinc-700 bg-[#131f24]" />
                <div className="h-7 w-36 rounded-full bg-[#131f24]" />
                <div className="h-10 w-24 rounded-2xl bg-[#131f24]" />
              </div>
            ))}
          </div>
        </div>

        {/* Core Performance */}
        <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
          Core Performance
        </h3>

        <div className="mb-8 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-5"
            >
              <div className="mb-4 h-6 w-2/3 rounded-full bg-[#131f24]" />
              <div className="h-8 w-full rounded-2xl bg-[#131f24]" />
            </div>
          ))}
        </div>

        {/* Language Mastery */}
        <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
          Language Mastery
        </h3>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-5"
            >
              <div className="mb-4 flex justify-between">
                <div className="h-7 w-20 rounded-full bg-[#131f24]" />
                <div className="h-7 w-28 rounded-full bg-[#131f24]" />
                <div className="h-7 w-20 rounded-full bg-[#131f24]" />
              </div>

              <div className="h-5 w-full rounded-full bg-[#131f24]" />
            </div>
          ))}
        </div>

        {/* Skill Categories */}
        <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
          Skill Categories
        </h3>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-5"
            >
              <div className="mb-3 h-6 w-1/2 rounded-full bg-[#131f24]" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-[#131f24]" />
                <div className="h-4 w-5/6 rounded-full bg-[#131f24]" />
                <div className="h-4 w-3/4 rounded-full bg-[#131f24]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Comparison Rows */}
        <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
          Comparison
        </h3>

        <div className="space-y-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-5"
            >
              <div className="flex items-center justify-between">
                <div className="h-7 w-20 rounded-full bg-[#131f24]" />
                <div className="h-7 w-40 rounded-full bg-[#131f24]" />
                <div className="h-7 w-20 rounded-full bg-[#131f24]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}