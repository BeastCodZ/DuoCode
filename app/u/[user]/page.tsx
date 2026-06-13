import { getFullUser } from "@/lib/leetcode";
import { timeAgo } from "@/lib/timeAgo";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import BadgeIcon from "@/components/BadgeIcon";
import Heatmap from "@/components/Heatmap";
import { getLastNDays, calculateStreak, getTodaySolved } from "@/lib/calender";
import AnimateIn from "@/components/AnimateIn";
import { 
  Flame, 
  Target, 
  Swords, 
  Handshake, 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Calendar, 
  Medal, 
  CheckCircle2,
  MapPin,
  Gem,
  Trophy,
  Award,
  ArrowUp,
  ArrowDown,
  X,
  Check
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{
    user: string;
  }>;
}) {
  const { user } = await params;
  const data = await getFullUser(user);

  const submissions = data.latestAccepted?.submission || [];
  
  const heatmapValues = getLastNDays(data.calendar.submissionCalendar, 35);
  const today = new Date().toDateString();

const solvedToday = new Set(
  submissions
    .filter(sub =>
      new Date(sub.timestamp * 1000).toDateString() === today
    )
    .map(sub => sub.titleSlug)
).size;
  const currentStreak = Math.max(data.calendar.streak || 0, calculateStreak(data.calendar.submissionCalendar));
  
  // Logic for League (Duolingo style)
  const solvedCount = data.solved.solvedProblem;
  const leagues = {
    diamond: { name: "Diamond", colorClasses: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: <Gem size={24} /> },
    ruby: { name: "Ruby", colorClasses: "bg-red-500/20 text-red-500 border-red-500/30", icon: <Gem size={24} /> },
    emerald: { name: "Emerald", colorClasses: "bg-green-500/20 text-green-500 border-green-500/30", icon: <Gem size={24} /> },
    gold: { name: "Gold", colorClasses: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", icon: <Trophy size={24} /> },
    bronze: { name: "Bronze", colorClasses: "bg-orange-500/20 text-orange-500 border-orange-500/30", icon: <Award size={24} /> },
  };

  const league = 
    solvedCount > 1000 ? leagues.diamond :
    solvedCount > 500 ? leagues.ruby :
    solvedCount > 250 ? leagues.emerald :
    solvedCount > 100 ? leagues.gold :
    leagues.bronze;

  // Acceptance Rate calculation
  const totalSub = data.solved.totalSubmissionNum.find(s => s.difficulty === "All")?.submissions || 1;
  const acSub = data.solved.acSubmissionNum.find(s => s.difficulty === "All")?.count || 0;
  const acceptanceRate = ((acSub / totalSub) * 100).toFixed(1);

  // Skill stats preparation
  const easyTotal = 800;
  const mediumTotal = 1600;
  const hardTotal = 700;

  // Get top skills from tagProblemCounts
  const allSkills = [
    ...(data.skillStats?.tagProblemCounts?.fundamental || []),
    ...(data.skillStats?.tagProblemCounts?.intermediate || []),
    ...(data.skillStats?.tagProblemCounts?.advanced || []),
  ].sort((a, b) => b.problemsSolved - a.problemsSolved);

  // Recent Contests
  const recentContests = data.contests.contestHistory?.filter(c => c.attended).slice(-3).reverse() || [];

  return (
    <main className="min-h-screen bg-[#131f24] text-white p-4 md:p-8 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <AnimateIn direction="down" delay={0.1}>
            <div className="bg-[#202f36] border-2 border-b-8 border-[#37464f] rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 rounded-full bg-[#58cc02] opacity-5 blur-3xl transition-opacity group-hover:opacity-10`} />
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#58cc02] p-1 bg-[#131f24]">
                            <img
                            src={data.profile.avatar}
                            alt={data.profile.username}
                            className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#ffc800] text-black text-3xl p-2 rounded-2xl border-4 border-[#202f36] shadow-xl">
                            {league.icon}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                                {data.profile.name || data.profile.username}
                            </h1>
                            <span className="text-zinc-500 font-bold text-xl md:text-2xl">@{data.profile.username}</span>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                            <span className="bg-[#1cb0f6]/20 text-[#1cb0f6] px-5 py-2 rounded-2xl border-2 border-[#1cb0f6]/30 font-black text-sm uppercase tracking-wider">
                                Rank #{data.profile.ranking.toLocaleString()}
                            </span>
                            <span className={`${league.colorClasses} px-5 py-2 rounded-2xl border-2 font-black text-sm uppercase tracking-wider`}>
                                {league.name} League
                            </span>
                            {data.profile.country && (
                                <span className="bg-zinc-800 text-zinc-400 px-5 py-2 rounded-2xl border-2 border-zinc-700 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={14} /> {data.profile.country}
                                </span>
                            )}
                        </div>

                        {data.profile.about && (
                            <p className="mt-6 text-zinc-400 font-medium leading-relaxed max-w-2xl text-lg">
                                {data.profile.about}
                            </p>
                        )}

                        {/* Social Links */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            {data.profile.gitHub && (
                                <a href={data.profile.gitHub} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <FaGithub size={20} />
                                </a>
                            )}
                            {data.profile.twitter && (
                                <a href={data.profile.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </a>
                            )}
                            {data.profile.linkedIn && (
                                <a href={data.profile.linkedIn} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <FaLinkedin size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AnimateIn>

        {/* STATS GRID */}
        <AnimateIn direction="scale" delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard 
                label="Current Streak" 
                value={`${currentStreak} Days`} 
                icon={<Flame size={32} />} 
                color="orange" 
                description="Keep it up!"
            />
            <StatCard 
                label="Solved Today" 
                value={solvedToday} 
                icon={<Check size={32} />} 
                color="pink" 
                description="Problem solved today"
            />
            <StatCard 
                label="Acceptance Rate" 
                value={`${acceptanceRate}%`} 
                icon={<Target size={32} />} 
                color="green" 
                description="Overall accuracy"
            />
            <StatCard 
                label="Contest Rating" 
                value={data.contests.contestRating ? Math.round(data.contests.contestRating) : "N/A"} 
                icon={<Swords size={32} />} 
                color="purple" 
                description={data.contests.contestTopPercentage ? `Top ${data.contests.contestTopPercentage}%` : "Global competition"}
            />
            <StatCard 
                label="Community" 
                value={data.community.reputation} 
                icon={<Handshake size={32} />} 
                color="blue" 
                description={`${data.community.solutionCount} Solutions`}
            />
            </div>
        </AnimateIn>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
                {/* DIFFICULTY BREAKDOWN */}
                <AnimateIn direction="left" delay={0.3}>
                    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <span className="bg-[#58cc02] p-2.5 rounded-2xl text-white">
                                <BarChart3 size={24} />
                            </span>
                            Difficulty Breakdown
                        </h3>
                        <div className="space-y-6">
                            <ProgressBar 
                                label="Easy" 
                                value={data.solved.easySolved} 
                                total={easyTotal} 
                                color="green" 
                            />
                            <ProgressBar 
                                label="Medium" 
                                value={data.solved.mediumSolved} 
                                total={mediumTotal} 
                                color="orange" 
                            />
                            <ProgressBar 
                                label="Hard" 
                                value={data.solved.hardSolved} 
                                total={hardTotal} 
                                color="red" 
                            />
                        </div>
                    </div>
                </AnimateIn>

                {/* CONTEST TRENDS */}
                {recentContests.length > 0 && (
                    <AnimateIn direction="left" delay={0.4}>
                        <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <span className="bg-[#ce82ff] p-2.5 rounded-2xl text-white">
                                    <TrendingUp size={24} />
                                </span>
                                Recent Contests
                            </h3>
                            <div className="space-y-4">
                                {recentContests.map((contest, i) => (
                                    <div key={i} className="bg-[#131f24] p-5 rounded-2xl border-2 border-b-4 border-[#37464f] flex items-center justify-between">
                                        <div>
                                            <h4 className="font-black text-white text-lg">{contest.contest.title}</h4>
                                            <p className="text-zinc-500 font-bold text-xs mt-1 uppercase tracking-wider">
                                                Rank #{contest.rank.toLocaleString()} • {contest.problemsSolved} Solved
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-[#ce82ff]">{Math.round(contest.rating)}</div>
                                            <div className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-end gap-1 ${contest.trendDirection === 'UP' ? 'text-[#58cc02]' : 'text-[#ff4b4b]'}`}>
                                                {contest.trendDirection === 'UP' ? <ArrowUp size={10} /> : <ArrowDown size={10} />} Rating
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateIn>
                )}

                {/* TOP SKILLS */}
                {allSkills.length > 0 && (
                    <AnimateIn direction="left" delay={0.5}>
                        <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <span className="bg-[#1cb0f6] p-2.5 rounded-2xl text-white">
                                    <Brain size={24} />
                                </span>
                                Top Skills
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {allSkills.slice(0, 15).map((skill) => (
                                    <div key={skill.tagSlug} className="bg-[#131f24] border-2 border-b-4 border-[#37464f] px-4 py-2.5 rounded-2xl flex items-center gap-3 group hover:-translate-y-1 transition-transform cursor-default">
                                        <span className="text-white font-bold text-sm">{skill.tagName}</span>
                                        <span className="bg-[#1cb0f6]/20 text-[#1cb0f6] px-2 py-0.5 rounded-lg text-xs font-black">
                                            {skill.problemsSolved}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateIn>
                )}

                {/* HEATMAP */}
                <AnimateIn direction="left" delay={0.6}>
                    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black flex items-center gap-3">
                                <span className="bg-[#58cc02] p-2.5 rounded-2xl text-white">
                                    <Calendar size={24} />
                                </span>
                                Activity Heatmap
                            </h3>
                            <span className="text-zinc-500 font-bold text-sm">Last 35 days</span>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-[#0b1418] p-6 rounded-3xl border-2 border-[#37464f]">
                                <Heatmap values={heatmapValues} />
                            </div>
                        </div>
                    </div>
                </AnimateIn>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
                {/* BADGES */}
                <AnimateIn direction="right" delay={0.3}>
                    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <span className="bg-[#ffc800] p-2.5 rounded-2xl text-white">
                                <Medal size={24} />
                            </span>
                            Badges ({data.badges.badgesCount})
                        </h3>
                        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {data.badges.badges?.slice(0, 12).map((badge) => (
                                <BadgeIcon key={badge.id} name={badge.displayName} icon={badge.icon} />
                            ))}
                        </div>
                        {data.badges.badgesCount > 12 && (
                            <p className="mt-6 text-center text-zinc-500 font-bold text-sm">
                                + {data.badges.badgesCount - 12} more
                            </p>
                        )}
                    </div>
                </AnimateIn>

                {/* RECENT ACTIVITY */}
                {submissions.length > 0 && (
                    <AnimateIn direction="right" delay={0.4}>
                        <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <span className="bg-[#58cc02] p-2.5 rounded-2xl text-white">
                                    <Target size={24} />
                                </span>
                                Recent Successes
                            </h3>
                            <div className="space-y-4">
                                {submissions.map((sub, i) => (
                                    <div key={i} className="bg-[#131f24] p-4 rounded-2xl border-2 border-b-4 border-[#37464f] flex items-center justify-between group hover:border-[#58cc02] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#58cc02]/20 flex items-center justify-center">
                                                <CheckCircle2 size={20} className="text-[#58cc02]" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-base leading-tight group-hover:text-[#58cc02] transition-colors line-clamp-1">
                                                    {sub.title}
                                                </h4>
                                                <p className="text-zinc-500 font-bold text-xs mt-1 uppercase tracking-wider">
                                                    {sub.lang} • {timeAgo(sub.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:block text-[#58cc02] font-black text-[10px] uppercase tracking-widest border-2 border-[#58cc02]/30 px-2 py-0.5 rounded-lg">
                                            Acc
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateIn>
                )}

                {/* COMMUNITY CARD */}
                <AnimateIn direction="right" delay={0.5}>
                    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-[32px] p-6 md:p-8">
                        <h3 className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-5">
                            Community Impact
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#131f24] p-4 rounded-2xl border-2 border-b-4 border-[#37464f] text-center">
                                <div className="text-2xl font-black text-white">{data.community.postCount}</div>
                                <div className="text-zinc-500 font-bold text-[10px] uppercase mt-1">Posts</div>
                            </div>
                            <div className="bg-[#131f24] p-4 rounded-2xl border-2 border-b-4 border-[#37464f] text-center">
                                <div className="text-2xl font-black text-white">{data.community.solutionCount}</div>
                                <div className="text-zinc-500 font-bold text-[10px] uppercase mt-1">Solutions</div>
                            </div>
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </div>

      </div>
    </main>
  );
}
