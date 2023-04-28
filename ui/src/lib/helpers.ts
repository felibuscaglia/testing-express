import { toast } from "react-hot-toast";
import { EMAIL_REGEX, MAIN_BRAND_COLOR, TEXT_FONT_FAMILY } from "./constants";

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
    timeString =
      minutesElapsed == 0
        ? "a few seconds"
        : `${minutesElapsed} minute${minutesElapsed === 1 ? "" : "s"}`;
  } else if (hoursElapsed < 24) {
    timeString = `${hoursElapsed} hour${hoursElapsed === 1 ? "" : "s"}`;
  } else {
    timeString = `${daysElapsed} day${daysElapsed === 1 ? "" : "s"}`;
  }

  return timeString;
};

export const showToastWithErrorMessage = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "bottom-center",
    style: {
      background: MAIN_BRAND_COLOR,
      padding: "16px",
      color: "white",
      fontFamily: TEXT_FONT_FAMILY,
    },
    iconTheme: {
      primary: "red",
      secondary: "white",
    },
  });
};
