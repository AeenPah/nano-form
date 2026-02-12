import { TValidationRule } from "../types";

const VALIDATION_RULES = {
  required:
    (message?: string): TValidationRule =>
    (val: string) =>
      !val ? message || "این فیلد ضروری می‌باشد." : null,

  phoneNumber:
    (message?: string): TValidationRule =>
    (val: string) =>
      !/^[0-9]{10,15}$/.test(val)
        ? message || "شماره‌تلفن معتبر نمی‌باشد."
        : null,

  email:
    (message?: string): TValidationRule =>
    (val: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || !val
        ? null
        : message || "آدرس ایمیل معتبر نمی‌باشد.",
};

export default VALIDATION_RULES;
