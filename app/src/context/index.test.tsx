import { act, render, screen } from "@testing-library/react";
import { TemplateContextProvider } from "./TemplateContext";
import { useTemplateContext } from "../hooks/useTemplateContext";
import { Api } from "../services/Api";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";
import { USER_TEMPLATES_LOCAL_STORAGE_KEY } from "../services/templates";

const mockedClient = new MockAdapter(Api);

describe("<TemplateContext />", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedClient.reset();
  });

  it("should render the default templates", async () => {
    const promise = Promise.resolve();
    jest.fn(() => promise);

    mockedClient.onGet(`/default-templates?lang=en`).reply(200, [
      {
        id: "1",
        subject: "subject from backend",
        body: "body from backend",
      },
    ]);

    const Consumer = () => {
      const { defaultTemplates, loading } = useTemplateContext();

      return (
        <div>
          <div>subject: {defaultTemplates[0]?.subject}</div>
          <div>{!loading && "loaded"}</div>
        </div>
      );
    };

    render(
      <TemplateContextProvider>
        <Consumer />
      </TemplateContextProvider>
    );

    await screen.findByText(/subject from backend/i);

    await screen.findByText(/loaded/i);

    await act(() => promise);
  });

  describe("when clicks on save user template", () => {
    it("calls onSaveUserTemplate", async () => {
      const promise = Promise.resolve();
      jest.fn(() => promise);

      mockedClient.onGet(`/default-templates?lang=en`).reply(200, []);

      const Consumer = () => {
        const { onSaveUserTemplate, userTemplates, loading } =
          useTemplateContext();

        return (
          <div>
            <div>{!loading && "loaded"}</div>

            {userTemplates.map((template) => (
              <div key={template.id}>
                <div>{template.subject}</div>
                <div>{template.body}</div>
              </div>
            ))}

            <button
              onClick={() =>
                onSaveUserTemplate({
                  id: "1",
                  subject: "user template subject",
                  body: "user template body",
                })
              }
            >
              Save
            </button>
          </div>
        );
      };

      render(
        <TemplateContextProvider>
          <Consumer />
        </TemplateContextProvider>
      );

      expect(await screen.findByText(/loaded/i)).toBeInTheDocument();

      userEvent.click(screen.getByText(/save/i));

      expect(
        await screen.findByText(/user template subject/i)
      ).toBeInTheDocument();

      await act(() => promise);
    });

    describe("when user deletes an user template", () => {
      it("calls onDeleteUserTemplate", async () => {
        const promise = Promise.resolve();
        jest.fn(() => promise);

        const userTemplates = [
          {
            id: "1",
            subject: "test template",
            body: "test content",
          },
        ];

        localStorage.setItem(
          USER_TEMPLATES_LOCAL_STORAGE_KEY,
          JSON.stringify(userTemplates)
        );

        mockedClient.onGet(`/default-templates?lang=en`).reply(200, []);

        const Consumer = () => {
          const { onDeleteUserTemplate, userTemplates } = useTemplateContext();

          return (
            <div>
              {userTemplates.map((template) => (
                <div key={template.id}>
                  <div>{template.subject}</div>
                  <div>{template.body}</div>
                </div>
              ))}

              <button onClick={() => onDeleteUserTemplate("1")}>Delete</button>
            </div>
          );
        };

        render(
          <TemplateContextProvider>
            <Consumer />
          </TemplateContextProvider>
        );

        expect(await screen.findByText(/test template/i)).toBeInTheDocument();

        userEvent.click(screen.getByText(/delete/i));

        expect(screen.queryByText(/test template/i)).not.toBeInTheDocument();

        await act(() => promise);
      });
    });

    describe("when user selects a template", () => {
      it("calls onSelectTemplate", async () => {
        const promise = Promise.resolve();
        jest.fn(() => promise);

        mockedClient.onGet(`/default-templates?lang=en`).reply(200, []);

        const Consumer = () => {
          const { onSelectTemplate } = useTemplateContext();

          return (
            <div>
              <button
                onClick={() =>
                  onSelectTemplate({
                    id: "1",
                    subject: "test template",
                    body: "test content",
                  })
                }
              >
                Select
              </button>
            </div>
          );
        };

        const spy = jest.spyOn(window.parent, "postMessage");

        render(
          <TemplateContextProvider>
            <Consumer />
          </TemplateContextProvider>
        );

        userEvent.click(screen.getByText(/select/i));

        expect(spy).toHaveBeenCalledWith(
          {
            template: {
              body: "test content",
              id: "1",
              subject: "test template",
            },
          },
          "https://mail.google.com/"
        );

        await act(() => promise);
      });
    });
  });
});
