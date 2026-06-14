import { TValidationRule } from "../types";

const VALIDATION_RULES = {
  required:
    (message?: string): TValidationRule =>
    (val: string) =>
      !val ? message || "This field is required." : null,

  phoneNumber:
    (message?: string): TValidationRule =>
    (val: string) =>
      !/^[0-9]{10,15}$/.test(val)
        ? message || "The phone number is not valid."
        : null,

  email:
    (message?: string): TValidationRule =>
    (val: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || !val
        ? null
        : message || "The email address is not valid.",
};

export default VALIDATION_RULES;
