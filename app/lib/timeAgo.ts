export function timeAgo(
  timestamp: string
) {
  const now = Date.now();

  const then =
    Number(timestamp) * 1000;

  const diff =
    Math.floor((now - then) / 1000);

  if (diff < 60)
    return `${diff}s ago`;

  if (diff < 3600)
    return `${Math.floor(
      diff / 60
    )}m ago`;

  if (diff < 86400)
    return `${Math.floor(
      diff / 3600
    )}h ago`;

  return `${Math.floor(
    diff / 86400
  )}d ago`;
}