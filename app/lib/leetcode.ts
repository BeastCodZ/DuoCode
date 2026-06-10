const API = "https://alfa-leetcode-api.onrender.com";

export interface LeetCodeProfile {
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

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed: ${url}`);
  }

  return res.json();
}

export async function getDailyQuestion(): Promise<LeetCodeDaily> {
  return get<LeetCodeDaily>(`${API}/daily`);
}

export async function getFullUser(
  username: string
): Promise<FullUserData> {
  const [
    profile,
    solved,
    calendar,
    latestAccepted,
    contests,
    badges,
    skillStats,
    community,
    languages,
  ] = await Promise.all([
    get<LeetCodeProfile>(`${API}/${username}`),
    get<LeetCodeSolved>(`${API}/${username}/solved`),
    get<LeetCodeCalendar>(`${API}/${username}/calendar`),
    get<{
      submission: {
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
      }[];
    }>(`${API}/${username}/acSubmission?limit=5`),
    get<LeetCodeContest>(`${API}/${username}/contest`).catch(() => ({}) as LeetCodeContest),
    get<LeetCodeBadge>(`${API}/${username}/badges`).catch(() => ({}) as LeetCodeBadge),
    get<LeetCodeSkillStats>(`${API}/${username}/skillStats`).catch(() => ({}) as LeetCodeSkillStats),
    get<LeetCodeCommunity>(`${API}/${username}/community`).catch(() => ({ reputation: 0, postCount: 0, solutionCount: 0, trustScore: 0 } as LeetCodeCommunity)),
    get<LeetCodeLanguageStats>(`${API}/${username}/languageStats`).catch(() => ({ matchedUser: { languageProblemCount: [] } } as LeetCodeLanguageStats)),
  ]);

  return {
    profile,
    solved,
    calendar,
    latestAccepted,
    contests,
    badges,
    skillStats,
    community,
    languages,
  };
}
