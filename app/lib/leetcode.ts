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
export type DifficultyParam = "EASY" | "MEDIUM" | "HARD";

/**
 * Fetches a list of problems filtered by a specific difficulty level.
 * @param difficulty - The desired problem level ('EASY', 'MEDIUM', 'HARD')
 * @param limit - Max number of problems to return (defaults to 50)
 * @param skip - Number of items to skip for pagination (defaults to 0)
 */
export async function getProblemsByDifficulty(
  difficulty: DifficultyParam,
  limit: number = 50,
  skip: number = 0
): Promise<LeetCodeProblemsResponse> {
  const url = `${API}/problems?difficulty=${difficulty}&limit=${limit}&skip=${skip}`;
  return get<LeetCodeProblemsResponse>(url);
}

/**
 * Concurrent utility helper to fetch data buckets from Easy, Medium, and Hard profiles all at once.
 */
// Define an interface for the final totals object
export interface LeetCodeTotalCountResponse {
  totalQuestions: number;
}


/**
 * Fetches the total count for a specific difficulty or all questions combined
 * @param difficulty - Optional: 'EASY', 'MEDIUM', 'HARD'. Leave out for grand total.
 */
export async function getTotalQuestionCount(
  difficulty?: "EASY" | "MEDIUM" | "HARD"
): Promise<number> {
  const queryParam = difficulty ? `?difficulty=${difficulty}&limit=1` : "?limit=1";
  const url = `${API}/problems${queryParam}`;
  
  const data = await get<LeetCodeTotalCountResponse>(url);
  return data.totalQuestions;
}

/**
 * Fetches total counts for Easy, Medium, and Hard completely independently of any user data
 */
export async function getAllCategoryTotals(): Promise<{ easy: number; medium: number; hard: number; total: number }> {
  const [easy, medium, hard, total] = await Promise.all([
    getTotalQuestionCount("EASY"),
    getTotalQuestionCount("MEDIUM"),
    getTotalQuestionCount("HARD"),
    getTotalQuestionCount(),
  ]);

  return { easy, medium, hard, total };
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
