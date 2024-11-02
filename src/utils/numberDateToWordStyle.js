import appTextSource from "@src/utils/appTextSource";
import dateToNumberStyleDate from "@src/utils/dateToNumberStyleDate";

const numberDateToDashFormat = (date) => {
  const workingDate = new Date(1899, 11, 30);
  workingDate.setDate(workingDate.getDate() + date);

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
  date,
  appLang,
}) => {
  const { today, tomorrow } =
    appTextSource(appLang).collection;
  const todaysDate = dateToNumberStyleDate(Date.now());
  const gap = date - todaysDate;
  if (gap <= 0) return today;
  if (gap === 1) return tomorrow;
  return numberDateToDashFormat(date);
};
