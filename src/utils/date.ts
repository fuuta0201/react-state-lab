import { format, isValid, parse } from "date-fns";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";

const APP_TIME_ZONE = "Asia/Tokyo";
const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm";

// 日付の検証
export const isValidDateTimeLocal = (value: string): boolean => {
  const parsedDate = parse(value, DATE_TIME_FORMAT, new Date());

  if (!isValid(parsedDate)) {
    return false;
  }

  return format(parsedDate, DATE_TIME_FORMAT) === value;
};

// date-time-local str -> UTC ISO str
export const convertUTC = (value: string): string => {
  return fromZonedTime(value, APP_TIME_ZONE).toISOString();
};

// UTC ISO str -> date-time-local str
export const convertDateTimeLocal = (value: string): string => {
  return formatInTimeZone(value, APP_TIME_ZONE, DATE_TIME_FORMAT);
};
