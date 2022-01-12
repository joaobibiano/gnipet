import { screen, render, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { AddTemplate } from ".";
import * as hook from "../../hooks/useTemplateContext";

describe("<AddTemplate />", () => {
  test("renders", async () => {
    jest.spyOn(hook, "useTemplateContext").mockImplementation(() => ({
      defaultTemplates: [],
      userTemplates: [],
      loading: false,
      onSaveUserTemplate: () => {},
      onDeleteUserTemplate: () => {},
      onSelectTemplate: () => {},
    }));

    render(<AddTemplate />);

    expect(
      screen.getByRole("button", { name: "Add Template Button" })
    ).toBeInTheDocument();
  });

  describe("when the user clicks on add button", () => {
    test("the editor opens", async () => {
      jest.spyOn(hook, "useTemplateContext").mockImplementation(() => ({
        defaultTemplates: [],
        userTemplates: [],
        loading: false,
        onSaveUserTemplate: () => {},
        onDeleteUserTemplate: () => {},
        onSelectTemplate: () => {},
      }));

      render(<AddTemplate />);

      userEvent.click(
        screen.getByRole("button", { name: "Add Template Button" })
      );

      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "Subject" })
        ).toBeInTheDocument();
      });
    });
  });

  describe("when the user saves on the editor form", () => {
    test("the editor closes", async () => {
      jest.spyOn(hook, "useTemplateContext").mockImplementation(() => ({
        defaultTemplates: [],
        userTemplates: [],
        loading: false,
        onSaveUserTemplate: () => {},
        onDeleteUserTemplate: () => {},
        onSelectTemplate: () => {},
      }));

      render(<AddTemplate />);

      userEvent.click(
        screen.getByRole("button", { name: "Add Template Button" })
      );

      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "Subject" })
        ).toBeInTheDocument();
      });

      userEvent.click(
        screen.getByRole("button", { name: "Editor Save Button" })
      );

      await waitFor(() => {
        expect(
          screen.queryByRole("textbox", { name: "Subject" })
        ).not.toBeInTheDocument();
      });
    });

    test("calls onSaveUserTemplate callback from hook", async () => {
      const onSaveSpy = jest.fn();
      jest.spyOn(hook, "useTemplateContext").mockImplementation(() => ({
        defaultTemplates: [],
        userTemplates: [],
        loading: false,
        onSaveUserTemplate: onSaveSpy,
        onDeleteUserTemplate: () => {},
        onSelectTemplate: () => {},
      }));

      render(<AddTemplate />);

      userEvent.click(
        screen.getByRole("button", { name: "Add Template Button" })
      );

      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "Subject" })
        ).toBeInTheDocument();
      });

      userEvent.click(
        screen.getByRole("button", { name: "Editor Save Button" })
      );

      expect(onSaveSpy).toHaveBeenCalled();
    });
  });

  describe("when the user closes the editor", () => {
    test("the editor closes", async () => {
      jest.spyOn(hook, "useTemplateContext").mockImplementation(() => ({
        defaultTemplates: [],
        userTemplates: [],
        loading: false,
        onSaveUserTemplate: () => {},
        onDeleteUserTemplate: () => {},
        onSelectTemplate: () => {},
      }));

      render(<AddTemplate />);

      userEvent.click(
        screen.getByRole("button", { name: "Add Template Button" })
      );

      await waitFor(() => {
        expect(
          screen.getByRole("textbox", { name: "Subject" })
        ).toBeInTheDocument();
      });

      userEvent.click(
        screen.getByRole("button", { name: "Editor Close Button" })
      );

      await waitFor(() => {
        expect(
          screen.queryByRole("textbox", { name: "Subject" })
        ).not.toBeInTheDocument();
      });
    });
  });
});
