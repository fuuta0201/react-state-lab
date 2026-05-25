import { describe, it, expect } from "vitest";
import { isValidDateTimeLocal, convertUTC, convertDateTimeLocal } from "./date";

describe("日付の検証・変換を行う関数のテスト", () => {
  describe("isValidDateTimeLocal", () => {
    it("正常な日付の場合、trueを返す", () => {
      expect(isValidDateTimeLocal("2026-05-08T23:11")).toBeTruthy();
    });
    it("不正な日付の場合、falseを返す", () => {
      expect(isValidDateTimeLocal("2026/05/08")).toBeFalsy();
    });
  });
  describe("convertUTC", () => {
    it("date-time-local文字列を渡した場合、UTC ISO文字列を返す", () => {
      expect(convertUTC("2026-05-08T23:11")).toBe("2026-05-08T14:11:00.000Z");
    });
    it("不正な日付の場合、例外を投げる", () => {
      expect(() => convertUTC("invalid")).toThrow(Error);
    });
  });
  describe("convertDateTimeLocal", () => {
    it("UTC ISO文字列を渡した場合、date-time-local文字列を返す", () => {
      expect(convertDateTimeLocal("2026-05-08T14:11:00.000Z")).toBe(
        "2026-05-08T23:11"
      );
    });
    it("不正な日付の場合、例外を投げる", () => {
      expect(() => convertDateTimeLocal("invalid")).toThrow(Error);
    });
  });
});
