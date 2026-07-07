import AnimateIn from "@/components/AnimateIn";
import BackButton from "@/components/BackButton";
import Image from "next/image";

export default function PointsPage() {
  return (
    <main className="min-h-screen bg-[#131f24] text-white px-4 py-10 font-sans gap-4">
      <div className="mx-auto max-w-4xl w-full flex flex-col gap-6 md:gap-8">
        <BackButton />
        <AnimateIn direction="down" delay={0.1}>
          <div className="relative w-full rounded-2xl border-2 border-[#37464f] bg-[#202f36] p-8 overflow-hidden">
            <div className="gap-2">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={180}
                  height={180}
                  className="w-48 h-auto"
                />

                <Image
                  src="/banner.webp"
                  alt="Banner"
                  width={240}
                  height={60}
                  className="mt-3 w-40 h-auto"
                />
              </div>

              <h1 className="mt-8 text-4xl font-black">Points System</h1>

              <p className="mt-4 text-lg text-zinc-200 leading-relaxed">
                Every solved problem counts. Build streaks, complete harder
                challenges, and stay consistent to earn more points and climb
                the leaderboard.
              </p>

              <p className="mt-3 text-zinc-400 leading-relaxed">
                Miss a day? Your streak might disappear, but your points
                won&apos;t. Keep coding, keep learning, and let DuoCode track
                the journey.
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimateIn direction="right" delay={0.3} className="h-full">
            <section className="h-full rounded-4xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-black">
                How points are earned
              </h2>
              <ul className="list-disc pl-5 text-zinc-300 leading-relaxed">
                <li>Every accepted problem earns you points.</li>
                <li>
                  Medium and Hard problems reward more points than Easy ones.
                </li>
                <li>Keeping your streak alive gives you bonus rewards.</li>
                <li>Unlocking badges can significantly boost your score.</li>
                <li>
                  Showing up every day is one of the fastest ways to climb.
                </li>
                <li>
                  Consistency beats grinding, don&apos;t let your streak break.
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-[#37464f] bg-[#131f24] p-4 text-sm text-zinc-400">
                <span className="font-bold text-white">Pro tip:</span> Missing a
                day hurts your momentum more than solving one less problem.
                Protect your streak.
              </div>
            </section>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.3} className="h-full">
            <section className="h-full rounded-4xl border-2 border-b-8 border-[#37464f] bg-[#202f36] p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-black">Difficulty Rewards</h2>

              <div className="space-y-4">
                
                <div className="rounded-2xl bg-[#131f24] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#58CC02]">Easy</p>

                    <span className="rounded-full border border-[#58CC02] bg-[#58CC02]/10 px-3 py-1 text-sm font-black text-[#58CC02]">
                      +5 Points
                    </span>
                  </div>

                  <p className="mt-2 text-zinc-400">
                    Perfect for building momentum and keeping your streak alive.
                  </p>
                </div>

                
                <div className="rounded-2xl bg-[#131f24] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#FFC800]">Medium</p>

                    <span className="rounded-full border border-[#FFC800] bg-[#FFC800]/10 px-3 py-1 text-sm font-black text-[#FFC800]">
                      +10 Points
                    </span>
                  </div>

                  <p className="mt-2 text-zinc-400">
                    The sweet spot for consistent progress and solid rewards.
                  </p>
                </div>

                
                <div className="rounded-2xl bg-[#131f24] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#FF4B4B]">Hard</p>

                    <span className="rounded-full border border-[#FF4B4B] bg-[#FF4B4B]/10 px-3 py-1 text-sm font-black text-[#FF4B4B]">
                      +15 Points
                    </span>
                  </div>

                  <p className="mt-2 text-zinc-400">
                    The toughest challenges with the biggest rewards. Worth
                    every point.
                  </p>
                </div>
              </div>
            </section>
          </AnimateIn>
        </div>

        <AnimateIn direction="up" delay={0.5}>
          <section className="mt-6 rounded-4xl border-2 border-b-8 border-[#1cb0f6] bg-[#202f36] p-6 md:p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-black text-[#1cb0f6]">
                  Calculation Notes
                </h2>

                <div className="space-y-3 text-zinc-300 leading-relaxed">
                  <p>
                    DuoCode rewards consistency over grinding. Solving a few
                    problems every day is better than disappearing for a week.
                  </p>

                  <p>
                    Your score is based on problem difficulty, streaks, badges,
                    and overall activity. Harder challenges and longer streaks
                    are rewarded more.
                  </p>

                  <p>
                    The scoring system may evolve over time, but the objective
                    stays the same: keep showing up, keep solving, and keep
                    improving.
                  </p>

                  <p className="font-semibold text-white">
                    Protect your streak. Future you will thank you.
                  </p>
                </div>
              </div>

              
              <div className="shrink-0">
                <Image
                  src="/workout.gif"
                  alt="Workout mascot"
                  width={180}
                  height={180}
                  unoptimized
                  className="w-56 md:w-56 h-auto"
                />
              </div>
            </div>
          </section>
        </AnimateIn>
      </div>
    </main>
  );
}
