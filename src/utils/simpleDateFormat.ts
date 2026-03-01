import { DateTime } from "luxon";

export function simpleDateFormat(date: Date) {
  return DateTime.fromJSDate(date).toFormat("dd LLL yyyy HH:MM:ss", {
    locale: "ru",
  });
}
