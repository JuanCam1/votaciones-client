export const toLocalDate = (dateString) => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
};

export const adjustEndDate = (dateString) => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  date.setDate(date.getDate() + 1);
  return date;
};
