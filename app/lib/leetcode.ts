import * as leetcodeService from "./duocode-api/services";

export interface LeetCodeProfile {
  points: any;
  username: string;
  name: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string;
  twitter: string;
  linkedIn: string;
  website: string[];
  country: string;
  company: string;
  school: string;
  skillTags: string[];
  about: string;
}

export interface LeetCodeSolved {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  acSubmissionNum: {
    difficulty: string;
    count: number;
  }[];
}

export interface LeetCodeCalendar {
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

export interface LeetCodeContest {
  contestAttend: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: number;
  contestBadges: {
    name: string;
    icon: string;
  } | null;
  contestHistory: {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    rank: number;
    contest: {
      title: string;
      startTime: number;
    };
  }[];
}

export interface LeetCodeBadge {
  length: number;
  badgesCount: number;
  badges: {
    id: string;
    name: string;
    shortName: string;
    displayName: string;
    icon: string;
    hoverText: string;
    medal: {
      slug: string;
      config: {
        iconGif: string;
        iconGifBackground: string;
      };
    };
    creationDate: string;
    category: string;
  }[];
  upcomingBadge: {
    name: string;
    icon: string;
  } | null;
}

export interface LeetCodeSkillStats {
  tagProblemCounts: {
    fundamental: {
      tagName: string;
      tagSlug: string;
      problemsSolved: number;
    }[];
    intermediate: {
      tagName: string;
      tagSlug: string;
      problemsSolved: number;
    }[];
    advanced: {
      tagName: string;
      tagSlug: string;
      problemsSolved: number;
    }[];
  };
}

export interface LeetCodeCommunity {
  reputation: number;
  trustScore: number;
  postCount: number;
  solutionCount: number;
}

export interface LeetCodeDaily {
  questionFrontendId: string;
  questionTitle: string;
  titleSlug: string;
  difficulty: string;
  date: string;
  questionLink: string;
}

export interface LeetCodeLanguageStats {
  matchedUser: {
    languageProblemCount: {
      languageName: string;
      problemsSolved: number;
    }[];
  };
}

export interface FullUserData {
  profile: LeetCodeProfile;
  solved: LeetCodeSolved;
  calendar: LeetCodeCalendar;
  latestAccepted: {
    submission: {
      title: string;
      titleSlug: string;
      timestamp: string;
      statusDisplay: string;
      lang: string;
    }[];
  };
  contests: LeetCodeContest;
  badges: LeetCodeBadge;
  skillStats: LeetCodeSkillStats;
  community: LeetCodeCommunity;
  languages: LeetCodeLanguageStats;
}
export interface LeetCodeProblem {
  questionFrontendId: string;
  questionTitle: string;
  titleSlug: string;
  difficulty: string;
  isPaidOnly: boolean;
  categoryTitle: string;
}

export interface LeetCodeProblemsResponse {
  totalQuestions: number;
  count: number;
  problemsetQuestionList: LeetCodeProblem[];
}

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
    leetcodeService.getAcSubmissions(username, 5),
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

