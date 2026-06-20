// types/types.ts

export interface SubmissionStat {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface SkillTag {
  tagSlug?: string;
  tagName: string;
  problemsSolved: number;
}

export interface LanguageProblemCount {
  languageName: string;
  problemsSolved: number;
}

export interface Badge {
  displayName: string;
}

export interface CommunityStats {
  reputation: number;
  postCount: number;
  solutionCount: number;
}

export interface UserProfile {
  username: string;
  avatar: string;
  ranking: number;
}

export interface SolvedStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: SubmissionStat[];
  acSubmissionNum: SubmissionStat[];
}

export interface CalendarData {
  submissionCalendar: string;
}

export interface SkillStats {
  tagProblemCounts: {
    fundamental: SkillTag[];
    intermediate: SkillTag[];
    advanced: SkillTag[];
  };
}

export interface LanguageStats {
  matchedUser: {
    languageProblemCount: LanguageProblemCount[];
  };
}

export interface BadgeData {
  badges: Badge[];
}

export interface FullUserData {
  profile: LeetCodeProfile;
  solved: LeetCodeSolved;
  calendar: LeetCodeCalendar;
  latestAccepted: LatestAcceptedData;
  contests: LeetCodeContest;
  badges: LeetCodeBadge;
  skillStats: LeetCodeSkillStats;
  community: LeetCodeCommunity;
  languages: LeetCodeLanguageStats;
}

/* ---------- Roadmap Types ---------- */

export interface Problem {
  title: string;
  titleSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  category: string;
  categories: string[];
}

/* ---------- Submission Types ---------- */

export interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface SubmissionResponse {
  count: number;
  submission: Submission[];
  acceptedToday?: number;
  solvedToday?: number;
}

export interface AcceptedSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface LatestAcceptedData {
  count?: number;
  submission: AcceptedSubmission[];
}

export interface ContestHistoryEntry {
  attended: boolean;
  rating?: number;
  ranking?: number;
  trendDirection?: string;
  contest?: {
    title: string;
    startTime: number;
  };
}

export interface ContestData {
  contestHistory: ContestHistoryEntry[];
}


export interface LeetCodeProfile {
  points: number;
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
  totalSubmissionNum: SubmissionStat[];
  acSubmissionNum: SubmissionStat[];
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
    fundamental: SkillTag[];
    intermediate: SkillTag[];
    advanced: SkillTag[];
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
    languageProblemCount: LanguageProblemCount[];
  };
}

// LatestAcceptedData for the latestAccepted property.
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