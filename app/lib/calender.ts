export function getTodaySolved(
  submissionCalendar?: string
) {
  if (!submissionCalendar) {
    return 0;
  }

  try {
    const calendar = JSON.parse(
      submissionCalendar
    );

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const timestamp = Math.floor(todayDate.getTime() / 1000);

    let count = calendar[timestamp] || calendar[timestamp.toString()] || 0;
      
    if (!count) {
        const keys = Object.keys(calendar);
        const fuzzyMatch = keys.find(k => {
            const kt = parseInt(k);
            return Math.abs(kt - timestamp) < 43200; 
        });
        if (fuzzyMatch) {
            count = calendar[fuzzyMatch];
        }
    }

    return count;
  } catch {
    return 0;
  }
}

export function getLastNDays(
  submissionCalendar?: string,
  days = 35
) {
  if (!submissionCalendar) {
    return Array(days).fill(0);
  }

  try {
    const calendar = JSON.parse(
      submissionCalendar
    );

    const result: number[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize now to start of day

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      const timestamp = Math.floor(date.getTime() / 1000);
      
      // LeetCode API timestamps can be slightly off due to timezone shifts
      // We check the exact timestamp and also ± 12 hours just in case
      let count = calendar[timestamp] || calendar[timestamp.toString()] || 0;
      
      if (!count) {
          // Try fuzzy matching within a 12 hour window if exact match fails
          const keys = Object.keys(calendar);
          const fuzzyMatch = keys.find(k => {
              const kt = parseInt(k);
              return Math.abs(kt - timestamp) < 43200; // 12 hours in seconds
          });
          if (fuzzyMatch) {
              count = calendar[fuzzyMatch];
          }
      }

      result.push(count);
    }

    return result;
  } catch {
    return Array(days).fill(0);
  }
}

export function calculateStreak(
  submissionCalendar?: string
): number {
  if (!submissionCalendar) return 0;

  try {
    const calendar = JSON.parse(submissionCalendar);

    const daySet = new Set(
      Object.keys(calendar).map(Number)
    );

    const now = new Date();

    // Today's UTC midnight
    let day =
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      ) / 1000;

    // If no solve today, allow streak to start from yesterday
    if (!daySet.has(day)) {
      day -= 86400;
    }

    let streak = 0;

    while (daySet.has(day)) {
      streak++;
      day -= 86400;
    }

    return streak;
  } catch {
    return 0;
  }
}