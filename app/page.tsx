"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeetCodeDaily } from "@/lib/leetcode";
import AnimateIn from "@/components/AnimateIn";
import { Target, User, Swords } from "lucide-react";
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

  // Use a initializer function for state to avoid useEffect lint issues with localStorage
  const [recentUsers, setRecentUsers] = useState<string[]>([]);
  const [recentBattles, setRecentBattles] = useState<BattleHistory[]>([]);

  useEffect(() => {
    fetch("/api/daily")
      .then((res) => res.json())
      .then(setDaily)
      .catch(console.error);

    // Load history from localStorage
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
    // Normalize battle key to avoid duplicates like (a,b) and (b,a)
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

  return (
    <main className="min-h-screen bg-[#131f24] text-white flex items-center justify-center px-4 font-sans py-10 overflow-hidden">
      <div className="max-w-3xl w-full">
        <AnimateIn direction="down" delay={0.1}>
          <div className="text-center mb-12">
            <div className="inline-block bg-[#202f36] p-4 rounded-2xl border-2 border-[#37464f]">
              <div className="relative inline-block mb-8">
                <Image
                  src="/duocode.webp"
                  alt="DuoCode"
                  width={200}
                  height={200}
                  className="w-48 h-auto"
                />
                <Image
                  src="/banner.webp"
                  alt="DuoCode Banner"
                  width={256}
                  height={256}
                  className="absolute left-0 -bottom-1/2 w-64 h-auto"
                />
              </div>

              <h2 className="text-lg font-bold text-zinc-300">
                Your rival already solved today&apos;s problem.
              </h2>
            </div>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PROFILE CARD */}
          <AnimateIn direction="left" delay={0.4} className="h-full">
            <div className="bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] transition-transform hover:-translate-y-1 h-full grid">
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
                  placeholder="LeetCode Username"
                  className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#58cc02] font-bold transition-colors text-white"
                  onKeyDown={(e) => e.key === "Enter" && handleProfileSubmit()}
                />
                <button
                  onClick={handleProfileSubmit}
                  className="w-full bg-[#58cc02] hover:bg-[#46a302] text-white font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#46a302] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-none"
                  disabled={!profileUser}
                >
                  Go
                </button>
              </div>
              {/* HISTORY SECTION */}
              {(recentUsers.length > 0 || recentBattles.length > 0) && (
                <AnimateIn direction="scale" delay={0.2} className="space-y-6">
                  {/* Recent Individual Profiles */}
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
                    </div>
                  )}
                </AnimateIn>
              )}
            </div>
          </AnimateIn>

          {/* COMPARE CARD */}
          <AnimateIn direction="right" delay={0.5} className="h-full">
            <div className="bg-[#202f36] rounded-4xl p-6 border-2 border-b-8 border-[#37464f] transition-transform hover:-translate-y-1 h-full grid">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="bg-[#ce82ff] p-2 rounded-2xl text-white">
                  <Swords size={24} />
                </span>
                Compare
              </h2>
              <div className="space-y-3 mt-auto">
                <input
                  value={user1}
                  onChange={(e) => setUser1(e.target.value)}
                  placeholder="First User"
                  className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#ce82ff] font-bold transition-colors text-white"
                />
                <input
                  value={user2}
                  onChange={(e) => setUser2(e.target.value)}
                  placeholder="Second User"
                  className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl px-4 py-3 outline-none focus:border-[#ce82ff] font-bold transition-colors text-white"
                  onKeyDown={(e) => e.key === "Enter" && handleBattleSubmit()}
                />
                <button
                  onClick={handleBattleSubmit}
                  className="w-full bg-[#ce82ff] hover:bg-[#a568cc] text-white font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#a568cc] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-none"
                  disabled={!user1 || !user2}
                >
                  Battle
                </button>
              </div>
              {/* Recent Battles */}
              {recentBattles.length > 0 && (
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
                </div>
              )}
            </div>
          </AnimateIn>
        </div>
        {/* DAILY QUEST SECTION */}
        {daily && (
          <AnimateIn direction="up" delay={0.3}>
            <div className="bg-[#202f36] border-2 border-b-8 border-[#1cb0f6] rounded-4xl p-4 md:p-8 mt-10 relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 p-6 opacity-10 group-hover:scale-110 transition-transform text-[#1cb0f6]">
                <Target size={128} />
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1cb0f6] font-black uppercase text-xs tracking-[0.3em] mb-3">
                  Today&apos;s Quest
                </h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-xs md:text-2xl font-black text-white group-hover:text-[#1cb0f6] transition-colors">
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
          </AnimateIn>
        )}
      </div>
    </main>
  );
}
