import ProgressCard from "./ProgressCard";
import StreakCard from "./StreakCard";
import LastSolved from "./LastSolved";

type Props = {
  username: string;
  solved: number;
  streak: number;
};

export default function UserProfile({
  username,
  solved,
  streak,
}: Props) {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-5xl font-black">
          {username}
        </h1>

        <p className="text-zinc-400 mt-2">
          Keep your streak alive.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <StreakCard streak={streak} />

        <ProgressCard
          current={1}
          goal={2}
        />

        <div className="bg-[#1b1d26] rounded-3xl p-6">
          <p className="text-zinc-400">
            Total Solved
          </p>

          <h2 className="text-5xl font-black mt-2">
            {solved}
          </h2>
        </div>

      </div>

      <LastSolved
      />

    </div>
  );
}