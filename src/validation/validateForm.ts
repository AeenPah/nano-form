import { TValidationSchema } from "../types";

export function validateForm<T extends Record<string, string>>(
  schema: TValidationSchema<T>,
  values: T,
): Partial<Record<keyof T, string>> {
  return Object.keys(schema).reduce(
    (errors, key) => {
      const rules = schema[key];
      const value = values[key];

      const error = rules.map((rule) => rule(value)).find(Boolean);

      if (error) {
        errors[key as keyof T] = error;
      }

      return errors;
    },
    {} as Partial<Record<keyof T, string>>,
  );
}
