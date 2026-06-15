# nanoform

A tiny React form hook built for simple forms.

nanoform was created for the forms most applications use every day—comments, sign-ins, contact forms, and basic checkout flows. While larger form libraries offer powerful features for complex use cases, sometimes you just need a straightforward way to handle a few inputs without extra complexity.

nanoform stores field values in refs to avoid unnecessary re-renders while still supporting validation, async submissions, and form resets. It focuses on simplicity, performance, and an API that's easy to understand.

## Example

```tsx
import {
  useForm,
  validateForm,
  VR,
  type TValidationSchema,
} from "@aienpah/nanoform";

type FormData = {
  name: string;
  email: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
};

const formSchema: TValidationSchema<FormData> = {
  name: [VR.required()],
  email: [VR.required(), VR.email()],
};

export default function App() {
  const { formRef, errors, handleChange, handleSubmit, isSubmitting } =
    useForm<FormData>(initialForm, (values) =>
      validateForm(formSchema, values),
    );

  function onSubmit(values: FormData) {
    console.log("Form submitted:", values);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" onChange={handleChange} />
        {errors?.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onChange={handleChange} />
        {errors?.email && <p>{errors.email}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```
