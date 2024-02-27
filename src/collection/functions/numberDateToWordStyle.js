import dateToNumberStyleDate from "./dateToNumberStyleDate";

const numberDateToDashFormat = (date) => {
  const workingDate = new Date("1899-12-30");
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

export const numberDateToWordStyleDate = (date) => {
  const today = dateToNumberStyleDate(new Date());
  const gap = date - today;
  if (gap <= 0) return "today";
  if (gap === 1) return "tomorrow";
  return numberDateToDashFormat(date);
};
