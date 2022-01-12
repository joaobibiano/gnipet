import { screen, render, waitFor } from "@testing-library/react";
import Section from ".";
import userEvent from "@testing-library/user-event";

const hasSectionRendered = () => {
  return waitFor(() => screen.getByText("Section Title"));
};

describe("<Section />", () => {
  test("renders", async () => {
    render(
      <Section
        templates={[
          {
            id: "1",
            subject: "Test",
            body: "<p>Test</p>",
          },
        ]}
        title="Section Title"
        loading={false}
        canEdit={false}
        onSelectItem={() => {}}
        actionButton={<div />}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  describe("when loading", () => {
    test("renders the loading message", async () => {
      render(
        <Section
          templates={[]}
          title="Section Title"
          loading
          canEdit={false}
          onSelectItem={() => {}}
          actionButton={<div />}
          onDelete={() => {}}
        />
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("when there are no templates", () => {
    test("renders the no templates message", async () => {
      render(
        <Section
          templates={[]}
          title="Section Title"
          loading={false}
          canEdit={false}
          onSelectItem={() => {}}
          actionButton={<div />}
          onDelete={() => {}}
        />
      );

      expect(screen.getByText("No templates yet")).toBeInTheDocument();
    });
  });

  describe("when user selected an item to edit", () => {
    test("renders the template editor", async () => {
      render(
        <Section
          templates={[
            {
              id: "1",
              subject: "Item to Edit",
              body: "<p>Body</p>",
            },
          ]}
          title="Section Title"
          loading={false}
          canEdit={true}
          onSelectItem={() => {}}
          actionButton={<div />}
          onDelete={() => {}}
        />
      );

      await hasSectionRendered();

      userEvent.click(
        screen.getByRole("button", { name: /Edit Item Button/i })
      );

      expect(
        screen.getByRole("form", { name: "Template Editor" })
      ).toBeInTheDocument();
    });

    describe("when user closes the editor", () => {
      test("goes back", async () => {
        render(
          <Section
            templates={[
              {
                id: "1",
                subject: "Item to Edit",
                body: "<p>Body</p>",
              },
            ]}
            title="Section Title"
            loading={false}
            canEdit={true}
            onSelectItem={() => {}}
            actionButton={<div />}
            onDelete={() => {}}
          />
        );

        await hasSectionRendered();

        userEvent.click(
          screen.getByRole("button", { name: /Edit Item Button/i })
        );

        expect(
          screen.getByRole("form", { name: "Template Editor" })
        ).toBeInTheDocument();

        userEvent.click(
          screen.getByRole("button", { name: /Editor Close Button/i })
        );

        await hasSectionRendered();
      });
    });

    describe("when user saves inside the editor", () => {
      test("goes back", async () => {
        render(
          <Section
            templates={[
              {
                id: "1",
                subject: "Item to Edit",
                body: "<p>Body</p>",
              },
            ]}
            title="Section Title"
            loading={false}
            canEdit={true}
            onSelectItem={() => {}}
            actionButton={<div />}
            onDelete={() => {}}
          />
        );

        await hasSectionRendered();

        userEvent.click(
          screen.getByRole("button", { name: /Edit Item Button/i })
        );

        expect(
          screen.getByRole("form", { name: "Template Editor" })
        ).toBeInTheDocument();

        userEvent.click(
          screen.getByRole("button", { name: /Editor Save Button/i })
        );

        await hasSectionRendered();
      });
    });
  });

  describe("when user selected an item to see the detail", () => {
    test("renders the detail", async () => {
      render(
        <Section
          templates={[
            {
              id: "1",
              subject: "Item to Edit",
              body: "<p>Body Secret</p>",
            },
          ]}
          title="Section Title"
          loading={false}
          canEdit={true}
          onSelectItem={() => {}}
          actionButton={<div />}
          onDelete={() => {}}
        />
      );

      await hasSectionRendered();

      userEvent.click(
        screen.getByRole("button", { name: /Detail Item Button/i })
      );

      expect(screen.getByText("Body Secret")).toBeInTheDocument();
    });

    describe("and close button is clicked", () => {
      test("renders the detail", async () => {
        render(
          <Section
            templates={[
              {
                id: "1",
                subject: "Item to Edit",
                body: "<p>Body Secret</p>",
              },
            ]}
            title="Section Title"
            loading={false}
            canEdit={true}
            onSelectItem={() => {}}
            actionButton={<div />}
            onDelete={() => {}}
          />
        );

        await hasSectionRendered();

        userEvent.click(
          screen.getByRole("button", { name: /Detail Item Button/i })
        );

        expect(screen.getByText("Body Secret")).toBeInTheDocument();

        userEvent.click(
          screen.getByRole("button", { name: /Close Detail Button/i })
        );

        expect(
          screen.getByRole("button", { name: /Detail Item Button/i })
        ).toBeInTheDocument();
      });
    });
  });

  describe("when user selected an item to delete", () => {
    test("calls onDelete callback", async () => {
      const deleteSpy = jest.fn();
      render(
        <Section
          templates={[
            {
              id: "id-1",
              subject: "Item",
              body: "<p>Body</p>",
            },
          ]}
          title="Section Title"
          loading={false}
          canEdit={true}
          onSelectItem={() => {}}
          onDelete={deleteSpy}
        />
      );

      await hasSectionRendered();

      userEvent.click(
        screen.getByRole("button", { name: /Delete Item Button/i })
      );

      expect(deleteSpy).toHaveBeenCalledWith("id-1");
    });
  });

  describe("when user selected an item to fills out the message", () => {
    test("calls onSelectItem callback", async () => {
      const onSelectItemSpy = jest.fn();
      render(
        <Section
          templates={[
            {
              id: "id-1",
              subject: "Item",
              body: "<p>Body</p>",
            },
          ]}
          title="Section Title"
          loading={false}
          canEdit={true}
          onSelectItem={onSelectItemSpy}
          onDelete={() => {}}
        />
      );

      await hasSectionRendered();

      userEvent.click(
        screen.getByRole("button", { name: /Select item button/i })
      );

      expect(onSelectItemSpy).toHaveBeenCalledWith({
        body: "<p>Body</p>",
        id: "id-1",
        subject: "Item",
      });
    });
  });
});
