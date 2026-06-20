import * as leetcodeService from "./duocode-api/services";
import {
  FullUserData,
  LeetCodeBadge,
  LeetCodeCommunity,
  LeetCodeContest,
  LeetCodeDaily,
  LeetCodeLanguageStats,
  LeetCodeProfile,
  LeetCodeSkillStats,
  LeetCodeSolved} from "@/types/types";

export async function getDailyQuestion(): Promise<LeetCodeDaily> {
  const data = await leetcodeService.getDailyProblem();
  return {
    questionFrontendId: String(data.questionFrontendId),
    questionTitle: data.questionTitle,
    titleSlug: data.titleSlug,
    difficulty: data.difficulty,
    date: data.date,
    questionLink: data.questionLink,
  };
}

export async function getAcSubmissions(
  username: string,
  limit?: number,
) {
  return leetcodeService.getAcSubmissions(username, limit);
}

export async function getFullUser(
  username: string
): Promise<FullUserData | null> {
  try{
  const [
    profile,
    solved,
    calendar,
    latestAccepted,
    contests,
    badges,
    skillStats,
    languages,
  ] = await Promise.all([
    leetcodeService.getUserData(username),
    leetcodeService.getSolvedProblems(username),
    leetcodeService.getCalendar(username),
    leetcodeService.getAcSubmissions(username, 20),
    leetcodeService.getUserContest(username).catch(() => ({}) as never),
    leetcodeService.getUserBadges(username).catch(() => ({}) as never),
    leetcodeService.getSkillStats(username).catch(() => ({}) as never),
    leetcodeService.getLanguageStats(username).catch(() => ({ matchedUser: { languageProblemCount: [] } } as never)),
  ]);


  // Map types to match LeetCodeProfile
  const mappedProfile: LeetCodeProfile = {
    username: profile.username,
    name: profile.name || '',
    avatar: profile.avatar || '',
    ranking: (profile.ranking ?? 0) as number,
    reputation: (profile.reputation ?? 0) as number,
    gitHub: profile.gitHub || '',
    twitter: profile.twitter || '',
    points: (profile as unknown as { points?: number }).points ?? 0,
    linkedIn: (profile as unknown as { linkedIN?: string }).linkedIN || (profile as unknown as { linkedIn?: string }).linkedIn || '', // Handle case difference
    website: profile.website || [],
    country: profile.country || '',
    company: profile.company || '',
    school: profile.school || '',
    skillTags: profile.skillTags || [],
    about: profile.about || '',
  };

  // Synthesize community data as it's not directly in the service yet
  const community: LeetCodeCommunity = {
    reputation: profile.reputation,
    trustScore: 0,
    postCount: 0,
    solutionCount: 0,
  };

  return {
    profile: mappedProfile,
    solved: solved as LeetCodeSolved,
    calendar: {
      streak: calendar.streak,
      totalActiveDays: calendar.totalActiveDays,
      submissionCalendar: calendar.submissionCalendar,
    },
    latestAccepted: latestAccepted as unknown as {
      submission: {
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
      }[];
    },
    contests: contests as unknown as LeetCodeContest,
    badges: {
      badgesCount: (badges as unknown as { badgesCount: number }).badgesCount || 0,
      badges: (badges as unknown as { badges: unknown[] }).badges || [],
      upcomingBadge: (badges as unknown as { upcomingBadges: unknown[] }).upcomingBadges?.[0] || null,
    } as unknown as LeetCodeBadge,
    skillStats: {
      tagProblemCounts: {
        fundamental: (skillStats as unknown as { fundamental: unknown[] }).fundamental || [],
        intermediate: (skillStats as unknown as { intermediate: unknown[] }).intermediate || [],
        advanced: (skillStats as unknown as { advanced: unknown[] }).advanced || [],
      }
    } as unknown as LeetCodeSkillStats,
    community,
    languages: {
      matchedUser: {
        languageProblemCount: (languages as unknown as { languageProblemCount: unknown[] }).languageProblemCount || []
      }
    } as unknown as LeetCodeLanguageStats,
  };
} catch {
  return null;
}
  
}

