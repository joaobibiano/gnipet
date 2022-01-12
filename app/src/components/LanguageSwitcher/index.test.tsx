import { screen, render } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from ".";
import * as i18n from "../../i18n";

describe("<LanguageSwitcher />", () => {
  test("renders", async () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
  });

  test("renders with default language as english", async () => {
    render(<LanguageSwitcher />);

    expect(
      screen.getByRole("button", {
        name: "language_button_EN",
      })
    ).toHaveClass("underline");

    expect(
      screen.getByRole("button", {
        name: "language_button_PT",
      })
    ).not.toHaveClass("underline");
  });

  describe("when user selects another language", () => {
    test("the selection changes", () => {
      render(<LanguageSwitcher />);

      userEvent.click(
        screen.getByRole("button", { name: "language_button_PT" })
      );

      expect(
        screen.getByRole("button", {
          name: "language_button_EN",
        })
      ).not.toHaveClass("underline");

      expect(
        screen.getByRole("button", {
          name: "language_button_PT",
        })
      ).toHaveClass("underline");
    });

    test("the global language is updated", () => {
      const spy = jest.spyOn(i18n, "setLanguage");
      render(<LanguageSwitcher />);

      userEvent.click(
        screen.getByRole("button", { name: "language_button_PT" })
      );

      expect(spy).toHaveBeenCalledWith("pt");
    });
  });
});
