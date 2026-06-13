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

export function calculateStreak(submissionCalendar?: string): number {
  if (!submissionCalendar) return 0;
  
  try {
    const calendar = JSON.parse(submissionCalendar);
    let streak = 0;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for (let i = 0; i < 1000; i++) { // check up to ~3 years
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const timestamp = Math.floor(date.getTime() / 1000);
      
      let count = calendar[timestamp] || calendar[timestamp.toString()] || 0;
      
      if (!count) {
          const keys = Object.keys(calendar);
          const fuzzyMatch = keys.find(k => {
              const kt = parseInt(k);
              return Math.abs(kt - timestamp) < 43200; 
          });
          if (fuzzyMatch) count = calendar[fuzzyMatch];
      }

      if (count > 0) {
          streak++;
      } else if (i === 0) {
          // If today is 0, the streak might still be active if yesterday was > 0
          continue;
      } else {
          // Streak broken
          break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}
