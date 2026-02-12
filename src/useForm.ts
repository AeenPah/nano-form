import { ChangeEvent, FormEvent, useRef, useState } from "react";

type TErrors<T> = Partial<Record<keyof T, string>>;

function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate?: (values: T) => TErrors<T>,
) {
  /* -------------------------------------------------------------------------- */
  /*                                 React Hooks                                */
  /* -------------------------------------------------------------------------- */

  const valuesRef = useRef<T>({ ...initialValues });
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<TErrors<T>>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    (valuesRef.current as Record<string, string>)[name] = value;
  }

  function handleSubmit(onSubmit: (values: T) => Promise<void> | void) {
    return async (e: FormEvent) => {
      e.preventDefault();

      const currentValues = { ...valuesRef.current };

      if (validate) {
        const validateErrors = validate(currentValues);

        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) return;
      }

      try {
        setIsSubmitting(true);
        await onSubmit(currentValues);
      } finally {
        setIsSubmitting(false);
        reset();
      }
    };
  }

  function reset() {
    valuesRef.current = { ...initialValues };
    setErrors(undefined);
    formRef.current?.reset();
  }

  return {
    formRef,
    values: initialValues,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
