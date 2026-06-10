type Props = {
  title: string;
  lang: string;
  timestamp: string;
};

import { timeAgo } from "@/lib/timeAgo";

export default function LastSolvedCard({
  title,
  lang,
  timestamp,
}: Props) {
  return (
    <div className="bg-[#1e222d] rounded-3xl p-6">

      <p className="text-zinc-400">
        Last Solved
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {title}
      </h2>

      <div className="flex gap-3 mt-3">

        <span className="px-3 py-1 rounded-full bg-black/30">
          {lang}
        </span>

        <span className="text-zinc-400">
          {timeAgo(timestamp)}
        </span>

      </div>

    </div>
  );
}