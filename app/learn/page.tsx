"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import problems from "@/lib/neetcode250.json";
import AnimateIn from "@/components/AnimateIn";
import { User, CheckCircle2, Circle, ChevronDown, AlertCircle, RefreshCw, Key, Unlink, RocketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LearnPage() {
  const [username, setUsername] = useState<string>("");
  const [inputUser, setInputUser] = useState("");
  const [solvedSlugs, setSolvedSlugs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [showSyncOptions, setShowSyncOptions] = useState(false);
  const [sessionCookie, setSessionCookie] = useState("");
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("learn_username");
    if (savedUser) {
      setUsername(savedUser);
      setInputUser(savedUser);
    }
    const savedSolved = localStorage.getItem("learn_solved");
    if (savedSolved) {
      setSolvedSlugs(JSON.parse(savedSolved));
    }
    const savedCookie = localStorage.getItem("learn_session_cookie");
    if (savedCookie) {
      setSessionCookie(savedCookie);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchAC = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/ac?username=${username}`);
        const data = await res.json();
        
        if (data && data.submission) {
          const newSolved = { ...solvedSlugs };
          let updated = false;
          data.submission.forEach((s: any) => {
            if (!newSolved[s.titleSlug]) {
              newSolved[s.titleSlug] = true;
              updated = true;
            }
          });
          
          if (updated) {
            setSolvedSlugs(newSolved);
            localStorage.setItem("learn_solved", JSON.stringify(newSolved));
          }
        }
      } catch (e) {
        console.error("Failed to fetch recent AC submissions");
      }
      setLoading(false);
    };
    
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?username=${username}`);
        const data = await res.json();
        if (data && data.avatar) {
          setAvatar(data.avatar);
        }
      } catch (e) {
        console.error("Failed to fetch profile");
      }
    };

    fetchAC();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSaveUser = () => {
    if (inputUser) {
      setUsername(inputUser);
      localStorage.setItem("learn_username", inputUser);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setInputUser("");
    setAvatar(null);
    setShowSyncOptions(false);
    setSessionCookie("");
    setSolvedSlugs({});
    localStorage.removeItem("learn_username");
    localStorage.removeItem("learn_session_cookie");
    localStorage.removeItem("learn_solved");
  };
  
  const handleUnlink = () => {
    setSessionCookie("");
    setShowSyncOptions(false);
    localStorage.removeItem("learn_session_cookie");
  };

  const handleBasicSync = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/ac?username=${username}`);
      const data = await res.json();
      
      if (data && data.submission) {
        const newSolved = { ...solvedSlugs };
        let updated = false;
        data.submission.forEach((s: any) => {
          if (!newSolved[s.titleSlug]) {
            newSolved[s.titleSlug] = true;
            updated = true;
          }
        });
        
        if (updated) {
          setSolvedSlugs(newSolved);
          localStorage.setItem("learn_solved", JSON.stringify(newSolved));
        }
      }
    } catch (e) {
      console.error("Failed to fetch recent AC submissions");
    }
    setLoading(false);
  };

  const handleFullSync = async (overrideCookie?: string) => {
    const cookieToUse = overrideCookie || sessionCookie;
    if (!cookieToUse) return;
    setSyncLoading(true);
    setSyncMessage({ text: "", type: "" });
    
    try {
      const res = await fetch("/api/sync-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionCookie: cookieToUse }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setSyncMessage({ text: data.error || "Sync failed. Your session token might be expired.", type: "error" });
        if (res.status === 401 || res.status === 403) {
          setSessionCookie("");
          localStorage.removeItem("learn_session_cookie");
        }
      } else if (data.success && data.slugs) {
        const newSolved = { ...solvedSlugs };
        let newCount = 0;
        
        data.slugs.forEach((slug: string) => {
          if (!newSolved[slug]) {
            newSolved[slug] = true;
            newCount++;
          }
        });
        
        setSolvedSlugs(newSolved);
        localStorage.setItem("learn_solved", JSON.stringify(newSolved));
        localStorage.setItem("learn_session_cookie", cookieToUse);
        
        setSyncMessage({ 
          text: `Success! Synced ${data.count} total solved problems (${newCount} new updates).`, 
          type: "success" 
        });
      }
    } catch (e) {
      setSyncMessage({ text: "Network error occurred", type: "error" });
    }
    
    setSyncLoading(false);
  };

  useEffect(() => {
    if (!username) return;
    const savedCookie = localStorage.getItem("learn_session_cookie");
    if (savedCookie) {
      handleFullSync(savedCookie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const toggleSolved = (slug: string, e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation
    const newSolved = { ...solvedSlugs, [slug]: !solvedSlugs[slug] };
    setSolvedSlugs(newSolved);
    localStorage.setItem("learn_solved", JSON.stringify(newSolved));
  };

  const problemsWithSlugs = problems.map(p => {
    const parts = p.link.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    return { ...p, slug };
  });

  const grouped = problemsWithSlugs.reduce((acc: Record<string, typeof problemsWithSlugs>, prob) => {
    if (!acc[prob.category]) {
      acc[prob.category] = [];
    }
    acc[prob.category].push(prob);
    return acc;
  }, {});

  const isFullSyncActive = Boolean(sessionCookie && !showSyncOptions);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-5 font-sans overflow-hidden relative">
      <BackButton />
      
      <div className="w-full max-w-7xl mt-6 mb-8">
        <AnimateIn direction="down">
          <div className="mb-8 flex flex-col items-center">
            <Link href="/">
              <div className="flex flex-col items-center">
                <Image
                  src="/banner.webp"
                  alt="DuoCode Banner"
                  width={160}
                  height={160}
                  className="w-40 h-auto"
                  priority
                />
              </div>
            </Link>
          </div>
        </AnimateIn>

        
        <AnimateIn direction="scale" delay={0.1}>
          <div className={`bg-black border-2 border-[#333333] rounded-[32px] p-6 md:p-8 mb-10 max-w-3xl mx-auto transition-colors duration-500 relative overflow-hidden group ${(loading || syncLoading) ? 'animate-pulse' : ''}`}>
            {username && (
              <div
                className={`absolute top-0 right-0 w-48 h-48 -mr-12 -mt-12 rounded-full opacity-5 blur-3xl transition-colors duration-500 group-hover:opacity-10 ${isFullSyncActive ? 'bg-[#8549BA]' : 'bg-[#ffa116]'}`}
              />
            )}
            
            {!username ? (
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-white">
                  <span className="bg-black border-2 border-[#ffa116] p-2 rounded-2xl text-[#ffa116]">
                    <User size={24} />
                  </span>
                  Set LeetCode Username
                </h2>
                <div className="space-y-3">
                  <input
                    value={inputUser}
                    onChange={(e) => setInputUser(e.target.value)}
                    maxLength={40}
                    placeholder="LeetCode Username"
                    className="w-full bg-black border-2 border-[#333333] rounded-2xl px-4 py-3 outline-none focus:border-[#58cc02] font-bold transition-colors text-white"
                    onKeyDown={(e) => e.key === "Enter" && handleSaveUser()}
                  />
                  <button
                    onClick={handleSaveUser}
                    className="w-full bg-black border-2 border-[#58cc02] hover:bg-[#58cc02]/10 text-[#58cc02] font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#46a302] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                    disabled={!inputUser}
                  >
                    Start Tracking
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="relative shrink-0">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 p-1 bg-black transition-colors duration-500 ${isFullSyncActive ? 'border-[#8549BA]' : 'border-[#ffa116]'}`}>
                      {avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={avatar} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-black">
                          <User size={48} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
                        {username}
                      </h2>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                      <span className={`px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 transition-colors duration-500 ${
                        isFullSyncActive 
                          ? 'bg-black text-[#a259e3] border-[#8549BA]' 
                          : 'bg-black text-[#ffa116] border-[#ffa116]'
                      }`}>
                        {isFullSyncActive ? "Full Sync Active" : "Basic Sync Active"}
                      </span>
                      <span className="bg-black text-[#58cc02] border-[#58cc02] border-2 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider">
                        {problemsWithSlugs.filter(p => solvedSlugs[p.slug]).length} / {problemsWithSlugs.length} Solved
                      </span>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
                      {isFullSyncActive ? (
                        <>
                          <button
                            onClick={() => handleFullSync()}
                            disabled={syncLoading}
                            className="bg-black border-2 border-[#ffa116] hover:bg-[#ffa116]/10 text-[#ffa116] font-black rounded-xl px-5 py-2.5 transition-all shadow-[0_4px_0_0_#cc8111] active:shadow-none active:translate-y-1 flex items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                          >
                            <RefreshCw size={16} className={syncLoading ? "animate-spin" : ""} /> Refresh
                          </button>
                          <button
                            onClick={handleUnlink}
                            className="bg-black border-2 border-[#333333] hover:border-[#D33131] hover:bg-[#D33131]/10 text-zinc-300 hover:text-[#D33131] font-black rounded-xl px-5 py-2.5 transition-colors duration-300 flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <Unlink size={16} /> Unlink
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleBasicSync}
                            disabled={loading}
                            className="bg-black border-2 border-[#ffa116] hover:bg-[#ffa116]/10 text-[#ffa116] font-black rounded-xl px-5 py-2.5 transition-all shadow-[0_4px_0_0_#cc8111] active:shadow-none active:translate-y-1 flex items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                          >
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
                          </button>
                          <button
                            onClick={() => setShowSyncOptions(!showSyncOptions)}
                            className="bg-black border-2 border-[#8549BA] hover:bg-[#8549BA]/10 text-[#8549BA] font-black rounded-xl px-5 py-2.5 transition-all shadow-[0_4px_0_0_#6D3B99] active:shadow-none active:translate-y-1 flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <Key size={16} /> Full Sync
                          </button>
                          <button
                            onClick={handleLogout}
                            className="bg-black border-2 border-[#333333] hover:border-[#D33131] hover:bg-[#D33131]/10 text-zinc-300 hover:text-[#D33131] font-black rounded-xl px-5 py-2.5 transition-colors duration-300 text-sm cursor-pointer"
                          >
                            Change User
                          </button>
                        </>
                      )}
                    </div>
                    
                    {!showSyncOptions && !isFullSyncActive && (
                      <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 font-bold text-sm bg-black p-3 rounded-2xl mt-4 w-fit md:ml-0 mx-auto border border-[#333333]">
                        <AlertCircle size={16} className="text-[#ffa116] shrink-0" />
                        <span>{loading ? "Syncing recent submissions..." : "Basic Sync only reports the 20 most recent submissions."}</span>
                      </div>
                    )}
                  </div>
                </div>

                
                {showSyncOptions && !isFullSyncActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="bg-black border-2 border-[#333333] rounded-3xl p-6 overflow-hidden mt-6"
                  >
                    <h3 className="text-lg font-black text-[#8549BA] flex items-center gap-2 mb-4">
                      <Key size={20} /> Secure Session Sync
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4 font-bold">
                      To sync your ENTIRE history, provide your <code className="bg-zinc-800 px-1 rounded text-[#c28ded]">LEETCODE_SESSION</code> cookie. 
                      It will be saved in your browser&apos;s local storage for live monitoring, and is <strong className="text-white">never saved</strong> on our servers.
                    </p>
                    <ol className="text-xs text-zinc-500 list-decimal pl-5 mb-5 space-y-1">
                      <li>Go to LeetCode.com and log in</li>
                      <li>Press <kbd className="bg-black border border-zinc-700 px-1 rounded">F12</kbd> to open DevTools</li>
                      <li>Go to the <strong>Application</strong> (or Storage) tab</li>
                      <li>Under Cookies, copy the value of <strong>LEETCODE_SESSION</strong></li>
                    </ol>
                    <div className="space-y-3">
                      <input
                        type="password"
                        value={sessionCookie}
                        onChange={(e) => setSessionCookie(e.target.value)}
                        placeholder="Paste LEETCODE_SESSION here..."
                        className="w-full bg-black border-2 border-[#333333] rounded-2xl px-4 py-3 outline-none focus:border-[#8549BA] font-bold transition-colors text-white"
                        onKeyDown={(e) => e.key === "Enter" && handleFullSync()}
                      />
                      <button
                        onClick={() => handleFullSync()}
                        className="w-full bg-black border-2 border-[#8549BA] hover:bg-[#8549BA]/10 text-[#8549BA] font-black rounded-2xl py-3 text-lg shadow-[0_4px_0_0_#6D3B99] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                        disabled={!sessionCookie || syncLoading}
                      >
                        {syncLoading ? "Syncing..." : "Sync All Completed"}
                      </button>
                      
                      {syncMessage.text && (
                        <div className={`p-3 rounded-2xl text-sm font-bold mt-2 text-center border-2 ${syncMessage.type === 'error' ? 'bg-black text-red-400 border-red-500' : 'bg-black text-[#58cc02] border-[#58cc02]'}`}>
                          {syncMessage.text}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </AnimateIn>

        {username && (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                <motion.div 
                  key="categories"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black rounded-[40px] p-6 md:p-8 border-2 border-[#333333] w-full max-w-5xl mx-auto"
                >
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                    <span className="bg-black p-3 rounded-2xl shadow-[0_4px_0_0_#ffa116] border-2 border-[#ffa116]">
                      <RocketIcon color="#ffa116" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#ffa116]">NeetCode 250</span>
                      <span className="text-sm text-zinc-400 font-bold">
                        Track your progress and plan your learning path.
                      </span>
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Object.entries(grouped).map(([category, probs], idx) => {
                      const completedCount = probs.filter(p => solvedSlugs[p.slug]).length;
                      const isFullyCompleted = completedCount === probs.length;
                      return (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`group rounded-3xl border-2 p-6 text-left transition-all hover:-translate-y-1 active:translate-y-1 cursor-pointer ${
                            isFullyCompleted 
                              ? 'bg-black border-[#58cc02] shadow-[0_4px_0_0_#46a302]' 
                              : 'bg-black border-[#333333] hover:border-[#ffa116] hover:shadow-[0_4px_0_0_#cc8111]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className={`text-2xl font-black ${isFullyCompleted ? 'text-[#58cc02]' : 'text-white'}`}>
                                {category}
                              </h3>
                              <p className="mt-2 text-sm font-bold uppercase tracking-wider text-zinc-400">
                                {completedCount} / {probs.length} Solved
                              </p>
                            </div>
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-black transition-transform group-hover:translate-x-1 border-2 ${
                              isFullyCompleted ? 'bg-black border-[#58cc02] text-[#58cc02]' : 'bg-black border-[#333333] group-hover:border-[#ffa116] text-white group-hover:text-[#ffa116]'
                            }`}>
                              →
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="problems"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black border-2 border-[#333333] rounded-[40px] p-6 md:p-8 relative w-full max-w-5xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="bg-black border-2 border-[#333333] hover:border-[#ffa116] text-zinc-300 hover:text-[#ffa116] font-black rounded-xl px-4 py-2 transition-colors duration-300 flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <ChevronDown size={18} className="rotate-90" /> Back to Categories
                    </button>
                    
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {grouped[selectedCategory].map((p, i) => {
                      const isSolved = solvedSlugs[p.slug];
                      return (
                        <motion.a
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          key={i}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`border-2 border-b-4 rounded-2xl p-5 flex items-center justify-between transition-all hover:-translate-y-1 active:translate-y-1 group/item cursor-pointer ${
                            isSolved 
                              ? 'bg-black border-[#58cc02]/5 hover:border-[#58cc02] shadow-[0_4px_0_0_#46a302]' 
                              : 'bg-black border-[#333333]/5 hover:border-[#ffa116] shadow-[0_4px_0_0_#333333] hover:shadow-[0_4px_0_0_#cc8111]'
                          }`}
                        >
                          <span className={`font-black truncate pr-2 text-lg ${isSolved ? 'text-[#58cc02]' : 'text-zinc-300 group-hover/item:text-white'}`}>
                            {p["name-leet"]}
                          </span>
                          <button
                            onClick={(e) => toggleSolved(p.slug, e)}
                            className={`p-1 shrink-0 rounded-full transition-colors cursor-pointer ${
                              isSolved 
                                ? 'text-[#58cc02] hover:bg-[#58cc02]/20' 
                                : 'text-zinc-500 hover:text-[#ffa116] hover:bg-zinc-800'
                            }`}
                          >
                            {isSolved ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                          </button>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </main>
  );
}