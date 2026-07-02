export function timeAgo(timestamp: string | number): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const then = Number(timestamp) * 1000;
  const diff = (then - Date.now()) / 1000;

  if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), "second");
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), "hours");
  if (Math.abs(diff) < 604800) return rtf.format(Math.round(diff / 86400), "day");
  if (Math.abs(diff) < 2629800) return rtf.format(Math.round(diff / 604800), "week");
  if (Math.abs(diff) < 31557600) return rtf.format(Math.round(diff / 2629800), "month");

  return rtf.format(Math.round(diff / 31557600), "year");
}