export type TValidationRule = (val: string) => string | null;

export type TValidationSchema<T> = {
  [K in keyof T]: TValidationRule[];
};
