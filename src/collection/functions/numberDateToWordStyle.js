import appTextSource from "../../utils/appTextSource";
import dateToNumberStyleDate from "./dateToNumberStyleDate";

const numberDateToDashFormat = (date) => {
  const workingDate = new Date("1899-12-31");
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
  const todaysDate = dateToNumberStyleDate(new Date());
  const gap = date - todaysDate;
  if (gap <= 0) return today;
  if (gap === 1) return tomorrow;
  return numberDateToDashFormat(date);
};
