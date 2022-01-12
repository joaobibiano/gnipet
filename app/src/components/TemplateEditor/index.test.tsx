/* eslint-disable testing-library/no-node-access */
import { screen, render, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { TemplateEditor } from ".";

const hasEditorRendered = () => {
  return waitFor(() => screen.getByRole("form", { name: "Template Editor" }));
};

describe("<TemplateEditor />", () => {
  test("renders", async () => {
    render(
      <TemplateEditor
        onClose={() => {}}
        onSave={() => {}}
        template={{
          id: "1",
          subject: "Test",
          body: "<p>Test</p>",
        }}
      />
    );

    await hasEditorRendered();

    expect(
      screen.getByRole("form", { name: "Template Editor" })
    ).toBeInTheDocument();
  });

  describe("when the template is provided", () => {
    test("renders the template's subject", async () => {
      render(
        <TemplateEditor
          onClose={() => {}}
          onSave={() => {}}
          template={{
            id: "1",
            subject: "Awesome subject",
            body: "<p>Test</p>",
          }}
        />
      );

      await hasEditorRendered();

      expect(screen.getByRole("textbox", { name: "Subject" })).toHaveValue(
        "Awesome subject"
      );
    });

    test("renders the template's body", async () => {
      render(
        <TemplateEditor
          onClose={() => {}}
          onSave={() => {}}
          template={{
            id: "1",
            subject: "Test",
            body: "<p>Awesome body</p>",
          }}
        />
      );

      await hasEditorRendered();

      expect(screen.getByText("Awesome body")).toBeInTheDocument();
    });
  });

  describe("when the template isn't provided", () => {
    test("renders the template's subject and body with empty values", async () => {
      const { container } = render(
        <TemplateEditor onClose={() => {}} onSave={() => {}} />
      );

      await hasEditorRendered();

      expect(screen.getByRole("textbox", { name: "Subject" })).toHaveValue("");

      // eslint-disable-next-line testing-library/no-container
      expect(container.querySelector(".ql-editor > p")?.innerHTML).toBe("<br>");
    });
  });

  describe("when the user submits the form", () => {
    test("calls the onSave prop with the new template", async () => {
      const onSave = jest.fn();

      render(<TemplateEditor onClose={() => {}} onSave={onSave} />);

      await hasEditorRendered();

      userEvent.type(screen.getByRole("textbox", { name: "Subject" }), "New");

      userEvent.click(
        screen.getByRole("button", { name: "Editor Save Button" })
      );

      expect(onSave).toHaveBeenCalledWith({
        id: undefined,
        subject: "New",
        body: "",
      });
    });
  });
});
