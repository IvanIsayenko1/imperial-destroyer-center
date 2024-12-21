import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("should update value after specified delay", async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: "initial" },
      }
    );

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    await vi.advanceTimersByTimeAsync(300);
    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });

  it("should clear the previous timeout on value change", async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: "initial" },
      }
    );

    rerender({ value: "updated1" });
    await vi.advanceTimersByTimeAsync(200);
    expect(result.current).toBe("initial");

    rerender({ value: "updated2" });
    await vi.advanceTimersByTimeAsync(200);
    expect(result.current).toBe("initial");

    await vi.advanceTimersByTimeAsync(100);
    expect(result.current).toBe("updated2");

    vi.useRealTimers();
  });

  it("should handle different types of values", async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: { test: 1 } },
      }
    );

    expect(result.current).toEqual({ test: 1 });

    rerender({ value: { test: 2 } });
    await vi.advanceTimersByTimeAsync(300);
    expect(result.current).toEqual({ test: 2 });

    vi.useRealTimers();
  });

  it("should handle delay changes", async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 300 },
      }
    );

    await vi.advanceTimersByTimeAsync(300);
    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });

    await vi.advanceTimersByTimeAsync(300);
    expect(result.current).toBe("initial");

    await vi.advanceTimersByTimeAsync(600);
    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });

  it("should cleanup timeout on unmount", () => {
    vi.useFakeTimers();

    const { unmount } = renderHook(() => useDebounce("test", 300));

    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();

    vi.useRealTimers();
  });
});
