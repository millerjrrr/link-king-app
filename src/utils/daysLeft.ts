const daysLeft = (date: Date): number => {
  const today = new Date();
  const input = new Date(date);

  // Calculate the time difference in milliseconds
  const timeDif =
    input.getTime() +
    3 * 24 * 60 * 60 * 1000 -
    today.getTime();

  // Convert the time difference to days
  const daysDif = Math.ceil(
    timeDif / (1000 * 60 * 60 * 24),
  );

  // Ensure that the result is not negative if the date is more than 3 days ago
  return Math.max(0, daysDif);
};

export default daysLeft;
