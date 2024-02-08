export const timeInStyle = (t) => {
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours =
    Math.floor(t / (1000 * 60 * 60)) - days * 24;
  const mins =
    Math.floor(t / (1000 * 60)) -
    hours * 60 -
    days * 24 * 60;
  let tps = `${mins}m`;
  if (hours > 0) tps = `${hours}h ${mins}m`;
  if (days > 0) tps = `${days}d ${hours}h ${mins}m`;
  return tps;
};
