import { getFullUser, FullUserData } from "@/lib/leetcode";
import BattleRow from "@/components/BattleRow";
import { calculateStreak } from "@/lib/calender";
import AnimateIn from "@/components/AnimateIn";
import Image from "next/image";
import {
  Crown,
  Calendar,
  CheckCircle2,
  Target,
  Flame,
  Handshake,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    user1: string;
    user2: string;
  }>;
};

function MiniProfile({
  user,
  winner,
}: {
  user: FullUserData;
  winner?: boolean;
}) {
  return (
    <Link href={`/u/${user.profile.username}`}>
      <div
        className={`flex flex-col rounded-2xl items-center gap-4 transition-transform duration-500 p-4`}
      >
        <div className="relative">
          <div
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${winner ? "border-[#ffc800]" : "border-zinc-700"} p-1.5 bg-[#131f24] relative shadow-2xl`}
          >
            <Image
              src={user.profile.avatar}
              alt={user.profile.username}
              width={200}
              height={200}
              priority
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {winner && (
            <div className="absolute -top-5 -right-5 text-[#ffc800] animate-bounce">
              <Crown size={40} fill="currentColor" />
            </div>
          )}
        </div>
        <div className="text-center">
          <h2
            className={`text-xl md:text-2xl font-black ${winner ? "text-[#ffc800]" : "text-white"}`}
          >
            {user.profile.username}
          </h2>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-1.5 bg-zinc-800/50 px-2 py-0.5 rounded-md inline-block">
            Rank #{user.profile.ranking.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
function getSolvedToday(
  submissions: { timestamp: string; titleSlug: string }[],
) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return new Set(
    submissions
      .filter((sub) => Number(sub.timestamp) * 1000 >= startOfToday.getTime())
      .map((sub) => sub.titleSlug),
  ).size;
}

export default async function ComparePage({ params }: Props) {
  const { user1, user2 } = await params;
  const [a, b] = await Promise.all([getFullUser(user1), getFullUser(user2)]);

  const aSolved = a.solved.solvedProblem;
  const bSolved = b.solved.solvedProblem;

  const winner = aSolved > bSolved ? a.profile.username : b.profile.username;

  // Acceptance Rate
  const getAcceptanceRate = (data: FullUserData) => {
    const total =
      data.solved.totalSubmissionNum.find((s) => s.difficulty === "All")
        ?.submissions || 1;
    const ac =
      data.solved.acSubmissionNum.find((s) => s.difficulty === "All")?.count ||
      0;
    return Math.round((ac / total) * 100);
  };

  // Extract shared skills for comparison
  const getTopSkills = (data: FullUserData) => {
    return [
      ...(data.skillStats?.tagProblemCounts?.fundamental || []),
      ...(data.skillStats?.tagProblemCounts?.intermediate || []),
      ...(data.skillStats?.tagProblemCounts?.advanced || []),
    ].reduce(
      (acc, curr) => {
        acc[curr.tagName] = curr.problemsSolved;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const aSkills = getTopSkills(a);
  const bSkills = getTopSkills(b);
  const commonSkillNames = Object.keys(aSkills)
    .filter((name) => bSkills[name] !== undefined)
    .sort((x, y) => aSkills[y] + bSkills[y] - (aSkills[x] + bSkills[x]))
    .slice(0, 5);

  // Languages comparison
  const getLangs = (data: FullUserData) => {
    return (data.languages?.matchedUser?.languageProblemCount || []).reduce(
      (acc, curr) => {
        acc[curr.languageName] = curr.problemsSolved;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const aLangs = getLangs(a);
  const bLangs = getLangs(b);
  const commonLangs = Object.keys({ ...aLangs, ...bLangs })
    .sort(
      (x, y) =>
        (aLangs[y] || 0) +
        (bLangs[y] || 0) -
        ((aLangs[x] || 0) + (bLangs[x] || 0)),
    )
    .slice(0, 5);

  const submissionsa = a.latestAccepted?.submission ?? [];
  const submissionsb = b.latestAccepted?.submission ?? [];

  const solvedTodaya = getSolvedToday(submissionsa);
  const solvedTodayb = getSolvedToday(submissionsb);

  return (
    <main className="min-h-screen bg-[#131f24] text-white p-4 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* BATTLE HEADER */}
        <AnimateIn direction="down" delay={0.1}>
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image
                src="/banner.webp"
                alt="DuoCode Banner"
                width={128}
                height={128}
                className="w-auto h-auto"
              />
            </Link>
          </div>
        </AnimateIn>

        {/* VERSUS SECTION */}
        <AnimateIn direction="scale" delay={0.2}>
          <div className="flex justify-between items-center bg-[#202f36] border-2 border-b-8 border-[#37464f] rounded-[40px] p-4 md:p-6 relative overflow-hidden group ">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/5 pointer-events-none select-none italic group-hover:text-white/10 transition-colors">
              <AnimateIn
                direction="scale"
                delay={0.6}
                className="items-center justify-center flex flex-col"
              >
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={128}
                  height={128}
                  className="w-16 md:w-32 opacity-60"
                />
                <div className="bg-[#46a500] opacity-60 text-white px-2 md:px-6 py-1 md:py-2 rounded-2xl font-black text-xs md:text-sm shadow-[0_2px_0_0_#3b5200] transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
                  WINNER: {winner.toUpperCase()}
                </div>
              </AnimateIn>
            </div>
            <MiniProfile user={a} winner={a.profile.username === winner} />

            <MiniProfile user={b} winner={b.profile.username === winner} />
          </div>
        </AnimateIn>

        {/* PERFORMANCE CATEGORIES */}
        <div className="space-y-10">
          <AnimateIn direction="up" delay={0.3}>
            <div>
              <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                Core Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <BattleRow
                  label="Solved Today"
                  user1Value={solvedTodaya}
                  user2Value={solvedTodayb}
                  icon={<Calendar size={16} stroke="yellow" />}
                  color="yellow"
                />
                <BattleRow
                  label="Current Streak"
                  user1Value={calculateStreak(a.calendar.submissionCalendar)}
                  user2Value={calculateStreak(b.calendar.submissionCalendar)}
                  icon={<Flame size={16} stroke="orange" />}
                  color="orange"
                />

                <BattleRow
                  label="Total Solved"
                  user1Value={a.solved.solvedProblem}
                  user2Value={b.solved.solvedProblem}
                  icon={<CheckCircle2 size={16} stroke="#46a500" />}
                  color="green"
                />
                <BattleRow
                  label="Acceptance Rate (%)"
                  user1Value={getAcceptanceRate(a)}
                  user2Value={getAcceptanceRate(b)}
                  icon={<Target size={16} stroke="#007acc" />}
                  color="blue"
                />
              </div>
            </div>
          </AnimateIn>

          {/* LANGUAGE BATTLE */}
          {commonLangs.length > 0 && (
            <AnimateIn direction="up" delay={0.4}>
              <div>
                <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                  Language Mastery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonLangs.map((lang) => (
                    <BattleRow
                      key={lang}
                      label={lang}
                      user1Value={aLangs[lang] || 0}
                      user2Value={bLangs[lang] || 0}
                      color="orange"
                    />
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}
          {/* SKILL BATTLE */}
          {commonSkillNames.length > 0 && (
            <AnimateIn direction="up" delay={0.6}>
              <div>
                <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                  Top Skill Matchups
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSkillNames.map((skill) => (
                    <BattleRow
                      key={skill}
                      label={skill}
                      user1Value={aSkills[skill]}
                      user2Value={bSkills[skill]}
                      color="blue"
                    />
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}
          {/* DIFFICULTY DRILL-DOWN */}
          <AnimateIn direction="up" delay={0.7}>
            <div>
              <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                Difficulty Balance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BattleRow
                  label="Easy"
                  user1Value={a.solved.easySolved}
                  user2Value={b.solved.easySolved}
                  color="green"
                />
                <BattleRow
                  label="Medium"
                  user1Value={a.solved.mediumSolved}
                  user2Value={b.solved.mediumSolved}
                  color="orange"
                />
                <BattleRow
                  label="Hard"
                  user1Value={a.solved.hardSolved}
                  user2Value={b.solved.hardSolved}
                  color="red"
                />
              </div>
            </div>
          </AnimateIn>
          {/* COMMUNITY BATTLE */}
          <AnimateIn direction="up" delay={0.5}>
            <div>
              <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                Community Presence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <BattleRow
                  label="Reputation"
                  user1Value={a.community.reputation}
                  user2Value={b.community.reputation}
                  icon={<Handshake size={16} stroke="#007acc" />}
                  color="blue"
                />
                <BattleRow
                  label="Discuss Posts"
                  user1Value={a.community.postCount}
                  user2Value={b.community.postCount}
                  icon={<MessageSquare size={16} stroke="yellow" />}
                  color="yellow"
                />
                <BattleRow
                  label="Solutions Shared"
                  user1Value={a.community.solutionCount}
                  user2Value={b.community.solutionCount}
                  icon={<Lightbulb size={16} stroke="#46a500" />}
                  color="green"
                />
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* BADGE BATTLE */}
        {/* <AnimateIn direction="up" delay={0.8}>
            <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-8 md:p-12">
                <h3 className="text-2xl font-black mb-8 text-center flex items-center justify-center gap-3">
                    <span className="bg-[#ffc800] p-2.5 rounded-2xl text-white">
                        <Medal size={24} />
                    </span>
                    Badge Collection
                </h3>
                <div className="flex flex-row gap-8 items-center">
                    <div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {a.badges.badges?.slice(0, 8).map((badge) => (
                                <BadgeIcon key={badge.id} name={badge.displayName} icon={badge.icon} />
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <span className="bg-zinc-800 text-zinc-400 font-black px-3 py-1 rounded-xl text-xs border-2 border-zinc-700 uppercase tracking-widest">
                                {a.badges.badgesCount} Badges
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-zinc-700/50" />

                    <div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {b.badges.badges?.slice(0, 8).map((badge) => (
                                <BadgeIcon key={badge.id} name={badge.displayName} icon={badge.icon} />
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <span className="bg-zinc-800 text-zinc-400 font-black px-3 py-1 rounded-xl text-xs border-2 border-zinc-700 uppercase tracking-widest">
                                {b.badges.badgesCount} Badges
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateIn> */}
      </div>
    </main>
  );
}
