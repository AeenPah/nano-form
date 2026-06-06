import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from "react";

type TErrors<T> = Partial<Record<keyof T, string>>;

function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate?: (values: T) => TErrors<T>,
) {
  /* -------------------------------------------------------------------------- */
  /*                                    Refs                                    */
  /* -------------------------------------------------------------------------- */

  const lastInitialValuesRef = useRef<T>(initialValues);
  const valuesRef = useRef<T>({ ...initialValues });

  const formRef = useRef<HTMLFormElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */

  const [errors, setErrors] = useState<TErrors<T>>();
  const [values, setValues] = useState<T>(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const updateValues = () => {
      lastInitialValuesRef.current = initialValues;
      valuesRef.current = initialValues;
      setValues(initialValues);
    };

    if (
      JSON.stringify(lastInitialValuesRef.current) !==
      JSON.stringify(initialValues)
    ) {
      updateValues();
    }
  }, [initialValues]);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    (valuesRef.current as Record<string, string>)[name] = value;
  }

  function handleSelectOption(name: string, value: string) {
    (valuesRef.current as Record<string, string>)[name] = value;
  }

  function handleSubmit(onSubmit: (values: T) => Promise<void> | void) {
    return async (event: SubmitEvent) => {
      event.preventDefault();

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
      }
    };
  }

  function reset() {
    valuesRef.current = { ...initialValues };
    setErrors(undefined);
    formRef.current?.reset();
  }

  return {
    values,
    formRef,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    handleSelectOption,
  };
}

export default useForm;
