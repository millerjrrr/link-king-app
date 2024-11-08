import appTextSource from "@src/utils/appTextSource";

// this is weird but since we use google sheets style dates
// and they have day 1 being 31-Dec-1899
// then we have 0 is 30-Dec-1899 which is weirdly represented as the below

const dateToNumberStyleDate = (dateInMS: number) =>
  Math.floor(
    Math.abs(dateInMS - new Date(1899, 11, 30).getTime()) /
      (1000 * 60 * 60 * 24),
  ) * 1;

const numberDateToDashFormat = (dateAsNumber: number) => {
  const workingDate = new Date(1899, 11, 30);
  workingDate.setDate(workingDate.getDate() + dateAsNumber);

  const day = String(workingDate.getDate()).padStart(
    2,
    "0",
  );
  const month = String(workingDate.getMonth() + 1).padStart(
    2,
    "0",
  );
  const year = String(workingDate.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

export const numberDateToWordStyleDate = ({
  dateAsNumber,
  appLang,
}: {
  dateAsNumber: number;
  appLang: string;
}) => {
  const { today, tomorrow } =
    appTextSource(appLang).collection;
  const todaysDate = dateToNumberStyleDate(Date.now());
  const gap = dateAsNumber - todaysDate;
  if (gap <= 0) return today;
  if (gap === 1) return tomorrow;
  return numberDateToDashFormat(dateAsNumber);
};
