import * as formatUtils from './FormatUtils';
import * as gqlQueries from './GQLQueries';

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

async function leetcodeRequest(query: string, variables: Record<string, unknown>) {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(JSON.stringify(result.errors));
  }
  return result.data;
}

export async function getUserData(username: string) {
  const data = await leetcodeRequest(gqlQueries.userProfileQuery, { username });
  return formatUtils.formatUserData(data);
}

export async function getSolvedProblems(username: string) {
  const data = await leetcodeRequest(gqlQueries.userProfileQuery, { username });
  return formatUtils.formatSolvedProblemsData(data);
}

export async function getCalendar(username: string, year?: number) {
  const data = await leetcodeRequest(gqlQueries.userProfileCalendarQuery, {
    username,
    year: year || new Date().getFullYear(),
  });
  return formatUtils.formatSubmissionCalendarData(data);
}

export async function getAcSubmissions(username: string, limit?: number) {
  const data = await leetcodeRequest(gqlQueries.AcSubmissionQuery, {
    username,
    limit,
  });
  return formatUtils.formatAcSubmissionData(data);
}

export async function getUserContest(username: string) {
  const data = await leetcodeRequest(gqlQueries.contestQuery, { username });
  return formatUtils.formatContestData(data);
}

export async function getUserBadges(username: string) {
  const data = await leetcodeRequest(gqlQueries.userProfileQuery, { username });
  return formatUtils.formatBadgesData(data);
}

export async function getSkillStats(username: string) {
  const data = await leetcodeRequest(gqlQueries.skillStatsQuery, { username });
  return formatUtils.formatSkillStats(data);
}

export async function getUserProfile(username: string) {
  const data = await leetcodeRequest(gqlQueries.getUserProfileQuery, {
    username,
  });
  return formatUtils.formatUserProfileData(data);
}

export async function getLanguageStats(username: string) {
  const data = await leetcodeRequest(gqlQueries.languageStatsQuery, {
    username,
  });
  return formatUtils.formatLanguageStats(data);
}

export async function getDailyProblem() {
  const data = await leetcodeRequest(gqlQueries.dailyProblemQuery, {});
  return formatUtils.formatDailyData(data);
}
