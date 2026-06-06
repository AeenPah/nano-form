import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useForm from "../useForm";

describe("useForm", () => {
  it("returns initial state", () => {
    const { result } = renderHook(() =>
      useForm({
        email: "",
        password: "",
      }),
    );

    expect(result.current.errors).toBeUndefined();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.formRef.current).toBeNull();

    expect(result.current.values).toEqual({
      email: "",
      password: "",
    });
  });

  it("should submit update values", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm({
        email: "",
      }),
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: "email",
          value: "shit@test.com",
        },
      } as any);
    });

    const submitHandler = result.current.handleSubmit(onSubmit);

    await act(async () => {
      await submitHandler({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "shit@test.com",
    });
  });

  it("should not submit when validation fails", async () => {
    const onSubmit = vi.fn();

    const validate = vi.fn(() => ({ email: "Required" }));

    const { result } = renderHook(() =>
      useForm(
        {
          email: "",
        },
        validate,
      ),
    );

    const submitHandler = result.current.handleSubmit(onSubmit);

    await act(async () => {
      await submitHandler({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(validate).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.errors).toEqual({
      email: "Required",
    });
  });

  it("should submit when validation passes", async () => {
    const onSubmit = vi.fn();

    const validate = vi.fn(() => ({}));

    const { result } = renderHook(() =>
      useForm(
        {
          email: "",
        },
        validate,
      ),
    );

    const submitHandler = result.current.handleSubmit(onSubmit);

    await act(async () => {
      await submitHandler({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(validate).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("should update values when initialValues changes", () => {
    const { result, rerender } = renderHook(({ values }) => useForm(values), {
      initialProps: {
        values: {
          email: "",
        },
      },
    });

    rerender({
      values: {
        email: "new@email.com",
      },
    });

    expect(result.current.values).toEqual({
      email: "new@email.com",
    });
  });
});
