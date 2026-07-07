import { getFullUser } from "@/lib/leetcode";
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
  InfoIcon,
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Error from "@/components/Error";
import type { FullUserData } from "@/types/types";
import { getAcSubmissions } from "@/lib/leetcode";

type Props = {
  params: Promise<{
    user1: string;
    user2: string;
  }>;
};


function MiniProfile({
  user,
  winner,
  points,
}: {
  user: FullUserData;
  winner?: boolean;
  points: number;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl items-center gap-4 transition-transform duration-500 p-4`}
    >
      <div className="relative">
        <Link href={`/u/${user.profile.username}`}>
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
        </Link>
        {winner && (
          <div className="absolute -top-5 -right-5 text-[#ffc800] animate-bounce">
            <Crown size={40} fill="currentColor" />
          </div>
        )}
      </div>
      <div className="text-center">
        <Link href={`/u/${user.profile.username}`}>
          <h2
            className={`text-xl md:text-2xl font-black transition-colors ${winner ? "text-[#ffc800]" : "text-white hover:text-[#58cc02]"
              }`}
          >
            {user.profile.username}
          </h2>
        </Link>

        <div className="mt-2 flex flex-col gap-1 rounded-md bg-[#1b272c] px-3 py-1 shadow-[0px_3px_0px_0px_#293941]">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Rank #{user.profile.ranking.toLocaleString()}
          </p>

          <Link
            href="/points"
            className="group inline-flex items-center justify-center gap-1 text-xs font-black uppercase tracking-widest text-zinc-400 transition-colors hover:text-[#1cb0f6]"
          >
            <span>Points {points}</span>
            <InfoIcon
              size={12}
              className="transition-transform group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function calculateBadgePoints(badge: { displayName: string }) {
  const name = badge.displayName || "";

  if (name.includes("Days")) {
    return 40;
  }

  if (name.includes("Challenge")) {
    return 30;
  }

  if (name === "Guardian") {
    return 80;
  }
  if (name === "Knight") {
    return 60;
  }
  return 10;
}

export default async function ComparePage({ params }: Props) {
  const { user1, user2 } = await params;
const [a, b] = await Promise.all([
  getFullUser(user1),
  getFullUser(user2),
]);
  
  if (!a?.profile) {
    return <Error error="user-not-found" username={user1} />;
  }
  if (!b?.profile) {
    return <Error error="user-not-found" username={user2} />;
  }
  if (a.profile.username === b.profile.username) {
    return <Error error="custom" text="Users cannot compare against themselves." />;
  }

  const getAcceptanceRate = (data: FullUserData) => {
    const total =
      data.solved.totalSubmissionNum.find((s) => s.difficulty === "All")
        ?.submissions || 1;
    const ac =
      data.solved.acSubmissionNum.find((s) => s.difficulty === "All")?.count ||
      0;
    return Math.round((ac / total) * 100);
  };

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



  const solvedTodaya = (await getAcSubmissions(a?.profile?.username, 20)).solvedToday;
  const solvedTodayb = (await getAcSubmissions(b?.profile?.username, 20)).solvedToday;

  const userBadgesa = a.badges?.badges ?? [];
  const userBadgesb = b.badges?.badges ?? [];
  const totalPointsa = userBadgesa.reduce(
    (sum: number, badge: { displayName: string; }) => sum + calculateBadgePoints(badge),
    0,
  );
  const totalPointsb = userBadgesb.reduce(
    (sum: number, badge: { displayName: string; }) => sum + calculateBadgePoints(badge),
    0,
  );
  const aPoints =
    a.solved.easySolved * 5 +
    a.solved.mediumSolved * 10 +
    a.solved.hardSolved * 15 +
    calculateStreak(a.calendar.submissionCalendar) +
    totalPointsa;
  const bPoints =
    b.solved.easySolved * 5 +
    b.solved.mediumSolved * 10 +
    b.solved.hardSolved * 15 +
    calculateStreak(b.calendar.submissionCalendar) +
    totalPointsb;
  let winner: string | null;

if (aPoints !== bPoints) {
  winner =
    aPoints > bPoints
      ? a.profile.username
      : b.profile.username;
} else {
  const aTieBreaker =
    a.solved.mediumSolved +
    a.solved.hardSolved * 2;

  const bTieBreaker =
    b.solved.mediumSolved +
    b.solved.hardSolved * 2;

  if (aTieBreaker !== bTieBreaker) {
    winner =
      aTieBreaker > bTieBreaker
        ? a.profile.username
        : b.profile.username;
  } else if (
    a.solved.solvedProblem !==
    b.solved.solvedProblem
  ) {
    winner =
      a.solved.solvedProblem >
      b.solved.solvedProblem
        ? a.profile.username
        : b.profile.username;
  } else {
    winner = null;
  }
}

  return (
    <main className="min-h-screen bg-[#131f24] text-white p-4 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-4">
        <BackButton />
        
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

        
        <AnimateIn direction="scale" delay={0.2}>
          <div className="flex justify-between items-center bg-[#202f36] border-2 border-b-8 border-[#37464f] rounded-[40px] p-4 md:p-6 relative overflow-hidden group ">
            
            <div className="absolute top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/5 pointer-events-none select-none italic group-hover:text-white/10 transition-colors">
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
                  className="w-20 md:w-32 opacity-90"
                />
                <div className="bg-[#46a500] opacity-80 text-white px-2 md:px-6 py-1 md:py-2 rounded-2xl font-black text-[0.7rem] md:text-base shadow-[0_2px_0_0_#3b5200] transform -rotate-2 hover:rotate-0 transition-transform cursor-default flex flex-col items-center">
                  <span>WINNER:</span> <span>{winner?.toUpperCase() || "DRAW"}</span>
                </div>
              </AnimateIn>
            </div>
            <MiniProfile
              user={a}
              winner={a.profile.username === winner || winner === "Draw"}
              points={aPoints}
            />

            <MiniProfile
              user={b}
              winner={b.profile.username === winner || winner === "Draw"}
              points={bPoints}
            />
          </div>
        </AnimateIn>

        
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
          
          <AnimateIn direction="up" delay={0.5}>
            <div>
              <h3 className="text-center text-zinc-500 font-black uppercase text-sm tracking-[0.4em] mb-6">
                Community Presence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <BattleRow
                  label="Reputation"
                  user1Value={a.community?.reputation}
                  user2Value={b.community?.reputation}
                  icon={<Handshake size={16} stroke="#007acc" />}
                  color="blue"
                />
                <BattleRow
                  label="Discuss Posts"
                  user1Value={a.community?.postCount}
                  user2Value={b.community?.postCount}
                  icon={<MessageSquare size={16} stroke="yellow" />}
                  color="yellow"
                />
                <BattleRow
                  label="Solutions Shared"
                  user1Value={a.community?.solutionCount}
                  user2Value={b.community?.solutionCount}
                  icon={<Lightbulb size={16} stroke="#46a500" />}
                  color="green"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </main>
  );
}
