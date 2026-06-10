type Props = {
  current: number;
  goal: number;
};

export default function ProgressCard({
  current,
  goal,
}: Props) {
  const percent = Math.min(
    (current / goal) * 100,
    100
  );

  return (
    <div className="bg-[#1b1d26] rounded-3xl p-6">
      <h3 className="text-zinc-400 mb-4">
        Today&apos;s Goal
      </h3>

      <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#58cc02] rounded-full"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-4 text-2xl font-bold">
        {current}/{goal}
      </p>
    </div>
  );
}