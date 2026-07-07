"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeetCodeDaily } from "@/types/types";
import AnimateIn from "@/components/AnimateIn";
import { Target, User, Swords, RocketIcon } from "lucide-react";
import Image from "next/image";

interface BattleHistory {
  u1: string;
  u2: string;
}

export default function HomePage() {
  const router = useRouter();
  const [profileUser, setProfileUser] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [daily, setDaily] = useState<LeetCodeDaily | null>(null);

  const [recentUsers, setRecentUsers] = useState<string[]>([]);
  const [recentBattles, setRecentBattles] = useState<BattleHistory[]>([]);

  useEffect(() => {
    fetch("/api/daily")
      .then((res) => res.json())
      .then(setDaily)
      .catch(console.error);

    const savedUsers = localStorage.getItem("recentUsers");
    if (savedUsers) {
      setRecentUsers(JSON.parse(savedUsers));
    }
    const savedBattles = localStorage.getItem("recentBattles");
    if (savedBattles) {
      setRecentBattles(JSON.parse(savedBattles));
    }
  }, []);

  const saveUser = (user: string) => {
    if (!user) return;
    const updated = [user, ...recentUsers.filter((u) => u !== user)].slice(
      0,
      5,
    );
    setRecentUsers(updated);
    localStorage.setItem("recentUsers", JSON.stringify(updated));
  };

  const saveBattle = (u1: string, u2: string) => {
    if (!u1 || !u2) return;
    const sorted = [u1, u2].sort();
    const newBattle = { u1: sorted[0], u2: sorted[1] };

    const updated = [
      newBattle,
      ...recentBattles.filter(
        (b) => !(b.u1 === newBattle.u1 && b.u2 === newBattle.u2),
      ),
    ].slice(0, 3);

    setRecentBattles(updated);
    localStorage.setItem("recentBattles", JSON.stringify(updated));
  };

  const handleProfileSubmit = () => {
    if (profileUser) {
      saveUser(profileUser);
      router.push(`/u/${profileUser}`);
    }
  };

  const handleBattleSubmit = () => {
    if (user1 && user2) {
      saveUser(user1);
      saveUser(user2);
      saveBattle(user1, user2);
      router.push(`/compare/${user1}/${user2}`);
    }
  };

  const dailySkeleton = (
    <div className="bg-[#202f36] border-2 border-b-8 border-[#1cb0f6]/50 rounded-4xl p-4 md:p-8 mt-10 relative overflow-hidden animate-pulse shadow-[0_6px_0_0_#168dc3]">
      <div className="absolute top-0 left-1/2 p-6 opacity-10 text-[#1cb0f6]">
        <Target size={128} />
      </div>
      <div className="relative z-10">
        <div className="h-4 w-32 rounded-full bg-[#1b272c] border border-[#37464f] mb-4" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-3">
            <div className="h-7 w-72 max-w-full rounded-2xl bg-[#131f24] border-2 border-[#37464f]" />
            <div className="flex gap-2">
              <div className="h-8 w-24 rounded-xl bg-[#1cb0f6]/20 border-2 border-[#1cb0f6]/30" />
              <div className="h-8 w-24 rounded-xl bg-[#1b272c] border-2 border-[#37464f]" />
            </div>
          </div>
          <div className="h-12 w-36 rounded-2xl bg-[#1cb0f6]/20 border-2 border-[#1cb0f6]/30" />
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#131f24] text-white flex items-center justify-center px-4 font-sans py-10 overflow-hidden">
      <div className="max-w-md md:max-w-3xl w-full">
        <AnimateIn direction="down" delay={0.1}>
          <div className="text-center mb-12">
            <div className="inline-block rounded-2xl border-2 border-[#37464f] bg-[#202f36] p-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={192}
                  height={192}
                  className="w-48 h-auto"
                />

                <Image
                  src="/banner.webp"
                  alt="DuoCode Banner"
                  width={128}
                  height={128}
                  className="mt-2 w-48 h-auto"
                />

                <h2 className="mt-2 text-lg font-bold text-zinc-300">
                  Your rival already solved today&apos;s problem.
                </h2>
              </div>
            </div>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8">
          
          <AnimateIn direction="left" delay={0.4} className="h-full">
            <div className="h-full bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] transition-transform hover:-translate-y-1">
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-[#1cb0f6] p-2 rounded-2xl text-white">
                    <User size={24} />
                  </span>
                  View Profile
                </h2>
                <div className="space-y-3 mt-auto">
                  <input
                    value={profileUser}
                    onChange={(e) => setProfileUser(e.target.value)}
                    maxLength={40}
                    placeholder="LeetCode Username"
                    className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#58cc02] font-bold transition-colors text-white"
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleProfileSubmit()
                    }
                  />
                  <button
                    onClick={handleProfileSubmit}
                    className="w-full bg-[#58cc02] hover:bg-[#46a302] text-white font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#46a302] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-none"
                    disabled={!profileUser}
                  >
                    Go
                  </button>
                </div>
                
                {(recentUsers.length > 0 || recentBattles.length > 0) && (
                  <AnimateIn
                    direction="scale"
                    delay={0.2}
                    className="space-y-6"
                  >
                    
                    {recentUsers.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 p-4">
                        {recentUsers.map((user) => (
                          <button
                            key={user}
                            onClick={() => router.push(`/u/${user}`)}
                            className="bg-[#202f36] border-2 border-b-4 border-[#37464f] hover:border-[#1cb0f6] px-3 py-1.5 rounded-2xl font-bold text-sm text-zinc-300 transition-all hover:-translate-y-1 active:translate-y-0 active:border-b-2"
                          >
                            {user}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setRecentUsers([]);
                            localStorage.removeItem("recentUsers");
                          }}
                          className="bg-[#202f36] border-2 border-b-4 border-[#ce82ff]/50 hover:border-[#ce82ff] px-4 py-2 rounded-2xl font-bold text-sm text-[#ce82ff] transition-all hover:-translate-y-1 active:translate-y-0 active:border-b-2 flex items-center gap-2"
                        >
                          Clear List
                        </button>
                      </div>
                    )}
                  </AnimateIn>
                )}
              </div>
            </div>
          </AnimateIn>

          
          <AnimateIn direction="right" delay={0.5} className="h-full">
            <div className="h-full bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] transition-transform hover:-translate-y-1 grid">
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-[#ce82ff] p-2 rounded-2xl text-white">
                    <Swords size={24} />
                  </span>
                  Compare
                </h2>
                <div className="space-y-3 mt-auto">
                  <input
                    value={user1}
                    maxLength={40}
                    onChange={(e) => setUser1(e.target.value)}
                    placeholder="First User"
                    className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#ce82ff] font-bold transition-colors text-white"
                  />
                  <input
                    value={user2}
                    onChange={(e) => setUser2(e.target.value)}
                    maxLength={40}
                    placeholder="Second User"
                    className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#ce82ff] font-bold transition-colors text-white"
                    onKeyDown={(e) => e.key === "Enter" && handleBattleSubmit()}
                  />
                  <button
                    onClick={handleBattleSubmit}
                    type="button"
                    className="w-full bg-[#ce82ff] hover:bg-[#a568cc] text-white font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#a568cc] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-none"
                    disabled={!user1 || !user2}
                  >
                    Battle
                  </button>
                </div>
                
                {recentBattles.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-2 p-4">
                    {recentBattles.map((b, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          router.push(`/compare/${b.u1}/${b.u2}`);
                        }}
                        className="bg-[#202f36] border-2 border-b-4 border-[#ce82ff]/50 hover:border-[#ce82ff] px-4 py-2 rounded-2xl font-bold text-sm text-[#ce82ff] transition-all hover:-translate-y-1 active:translate-y-0 active:border-b-2 flex items-center gap-2"
                      >
                        {b.u1} <span className="text-zinc-600 italic">vs</span>{" "}
                        {b.u2}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setRecentBattles([]);
                        localStorage.removeItem("recentBattles");
                      }}
                      className="bg-[#202f36] border-2 border-b-4 border-[#ce82ff]/50 hover:border-[#ce82ff] px-4 py-2 rounded-2xl font-bold text-sm text-[#ce82ff] transition-all hover:-translate-y-1 active:translate-y-0 active:border-b-2 flex items-center gap-2"
                    >
                      Clear List
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center p-4">
                    <div className="border-2 border-dashed border-[#37464f] rounded-2xl p-4 text-center w-full">
                      <p className="text-sm font-bold text-zinc-500">
                        No recent battles. Challenge a friend!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimateIn>
        </div>
        <AnimateIn direction="up" delay={0.7}>
          <div className="bg-black border-2 border-[#333333] rounded-4xl p-4 md:p-8 mt-10 relative overflow-hidden group hover:border-[#ffa116] transition-colors duration-300">
            
            <div className="absolute top-0 left-1/2 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-300 text-[#ffa116]">
              <RocketIcon color="#ffa116" size={128} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-[#ffa116] font-black uppercase text-lg md:text-base tracking-[0.2em] mb-3">
                  Learning Path
                </h3>
                <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-[#ffa116] transition-colors">
                  NeetCode 250
                </h2>

                <p className="mt-2 text-zinc-400 max-w-xl">
                  Follow a structured progression through curated LeetCode
                  problems and track your completion along the way.
                </p>
              </div>

              <button
                onClick={() => router.push("/learn")}
                className="
            bg-black
            border-2
            border-[#ffa116]
            hover:bg-[#ffa116]/10
            text-[#ffa116]
            font-black
            rounded-2xl
            px-6
            py-3
            text-base
            shadow-[0_6px_0_0_#cc8111]
            active:shadow-none
            active:translate-y-1
            transition-all
            uppercase
            tracking-wider
            text-center
            whitespace-nowrap
            cursor-pointer
          "
              >
                View List
              </button>
            </div>
          </div>
        </AnimateIn>

        
        <AnimateIn direction="up" delay={0.8}>
          {daily ? (
            <div className="bg-[#202f36] border-2 border-b-8 border-[#1cb0f6]/50 rounded-4xl p-4 md:p-8 mt-10 relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 p-6 opacity-10 group-hover:scale-110 transition-transform text-[#1cb0f6]">
                <Target size={128} />
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1cb0f6] font-black uppercase text-lg md:text-base tracking-[0.2em] mb-3">
                  Today&apos;s Quest
                </h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-[#1cb0f6] transition-colors">
                      {daily.questionTitle}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase border-2 ${
                          daily.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-500 border-green-500/30"
                            : daily.difficulty === "Medium"
                              ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                              : "bg-red-500/20 text-red-500 border-red-500/30"
                        }`}
                      >
                        {daily.difficulty}
                      </span>
                      <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-xl text-xs font-black uppercase border-2 border-zinc-700">
                        {daily.date}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://leetcode.com/problems/${daily.titleSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1cb0f6] hover:bg-[#168dc3] text-white font-black rounded-2xl px-6 py-3 text-base shadow-[0_6px_0_0_#168dc3] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider text-center whitespace-nowrap"
                  >
                    Solve Now
                  </a>
                </div>
              </div>
            </div>
          ) : (
            dailySkeleton
          )}
        </AnimateIn>
      </div>
    </main>
  );
}
