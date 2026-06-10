type Props = {
  streak: number;
};

export default function StreakCard({
  streak,
}: Props) {
  return (
    <div className="bg-[#1e222d] rounded-3xl p-6">

      <p className="text-zinc-400">
        Current Streak
      </p>

      <h1 className="text-6xl font-black mt-2 text-[#58cc02]">
        🔥 {streak}
      </h1>

      <p className="text-zinc-400">
        days
      </p>

    </div>
  );
}