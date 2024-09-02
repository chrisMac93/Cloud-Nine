export const convertTo24HourFormat = (time: string): string => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes}`;
};
