import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
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
  });
});
