export const calculateCountdown = (futureTimestamp: number) => {
  const now = Date.now();
  const remainingTime = futureTimestamp - now;

  if (remainingTime <= 0) {
    return '00:00:00:00';
  }

  const daysLeft = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const formattedDays = daysLeft.toString().padStart(2, '0');
  const formattedHours = hoursLeft.toString().padStart(2, '0');
  const formattedMinutes = minutesLeft.toString().padStart(2, '0');
  const formattedSeconds = secondsLeft.toString().padStart(2, '0');

  return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
