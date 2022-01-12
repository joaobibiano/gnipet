import { DEFAULT_LANGUAGE, useLanguageChange } from ".";
import { act, renderHook } from "@testing-library/react-hooks";
import { setLanguage } from "./index";

describe("#useLanguageChange", () => {
  test("renders", async () => {
    const { result } = renderHook(() => useLanguageChange());

    expect(result.current.language).toBe(DEFAULT_LANGUAGE);
  });

  describe("when the user changes the language", () => {
    test("the language changes", async () => {
      const { result } = renderHook(() => useLanguageChange());

      expect(result.current.language).toBe("en");

      act(() => {
        setLanguage("pt");
      });

      expect(result.current.language).toBe("pt");
    });
  });
});
