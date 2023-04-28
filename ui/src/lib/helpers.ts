import { EMAIL_REGEX } from "./constants";

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const calculateTimeDiff = (date: Date) => {
  const timeElapsed = Date.now() - date.getTime();

  const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
  const hoursElapsed = Math.floor(timeElapsed / (1000 * 60 * 60));
  const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));

  let timeString = "";

  if (minutesElapsed < 60) {
    timeString = `${minutesElapsed} minute${minutesElapsed === 1 ? "" : "s"}`;
  } else if (hoursElapsed < 24) {
    timeString = `${hoursElapsed} hour${hoursElapsed === 1 ? "" : "s"}`;
  } else {
    timeString = `${daysElapsed} day${daysElapsed === 1 ? "" : "s"}`;
  }

  return timeString;
};
