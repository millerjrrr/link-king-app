function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export const convertMsToTime = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  if (hours > 0)
    return `${hours}:${padTo2Digits(
      minutes,
    )}:${padTo2Digits(seconds)}`;
  else return `${minutes}:${padTo2Digits(seconds)}`;
};
