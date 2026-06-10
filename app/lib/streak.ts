export function calculateStreak(
  submissions: Record<string, number>
) {
  let streak = 0;

  const today = new Date();

  while (true) {
    const ts = Math.floor(
      today.getTime() / 1000
    );

    if (
      submissions[ts] &&
      submissions[ts] > 0
    ) {
      streak++;
    } else {
      break;
    }

    today.setDate(
      today.getDate() - 1
    );
  }

  return streak;
}