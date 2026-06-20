export default function Loading() {
  return (
    <main className="min-h-screen bg-[#131f24] text-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="max-w-md md:max-w-3xl w-full animate-pulse">
        <div className="text-center mb-12">
          <div className="inline-block rounded-2xl border-2 border-[#37464f] bg-[#202f36] p-6 w-full shadow-[0_8px_0_0_#37464f]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-24 rounded-2xl bg-[#1b272c] border-2 border-[#37464f]" />
              <div className="w-56 h-4 rounded-full bg-[#2d3d45]" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] shadow-[0_6px_0_0_#37464f] space-y-5">
            <div className="h-7 w-40 rounded-full bg-[#1b272c] border border-[#37464f]" />
            <div className="space-y-3">
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
            </div>
          </div>

          <div className="bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] shadow-[0_6px_0_0_#37464f] space-y-5">
            <div className="h-7 w-32 rounded-full bg-[#1b272c] border border-[#37464f]" />
            <div className="space-y-3">
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
              <div className="h-12 rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="h-40 rounded-4xl bg-[#202f36] border-2 border-b-8 border-[#37464f] shadow-[0_6px_0_0_#37464f]" />
          <div className="h-40 rounded-4xl bg-[#202f36] border-2 border-b-8 border-[#37464f] shadow-[0_6px_0_0_#37464f]" />
        </div>
      </div>
    </main>
  );
}