import {
  deleteUserTemplate,
  getDefaultTemplateLocalStorageKey,
  getDefaultTemplates,
  getUserTemplates,
  saveUserTemplate,
  USER_TEMPLATES_LOCAL_STORAGE_KEY,
} from "./templates";
import MockAdapter from "axios-mock-adapter";
import { Api } from "../services/Api";

const mockedClient = new MockAdapter(Api);

describe("#getUserTemplates", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the user templates", () => {
    const userTemplates = [
      {
        id: "1",
        name: "test template",
        content: "test content",
      },
    ];

    localStorage.setItem(
      USER_TEMPLATES_LOCAL_STORAGE_KEY,
      JSON.stringify(userTemplates)
    );

    const result = getUserTemplates();

    expect(result).toStrictEqual(userTemplates);
  });

  it("should return an empty array if no user templates are stored", () => {
    const result = getUserTemplates();

    expect(result).toEqual([]);
  });
});

describe("#saveUserTemplate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should update the user templates if the template exists", () => {
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

    const template = {
      id: "1",
      subject: "new subject test template",
      body: "new body test content",
    };

    const result = saveUserTemplate(template);

    expect(result).toStrictEqual([template]);
  });

  it("should create a new user template if the template does not exist", () => {
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

    const template = {
      id: undefined,
      subject: "test template",
      body: "test content",
    };

    const result = saveUserTemplate(template);

    expect(result).toStrictEqual([userTemplates[0], template]);
  });
});

describe("#deleteUserTemplate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should delete the user template if it exists", () => {
    const userTemplates = [
      {
        id: "1",
        subject: "test template",
        body: "test content",
      },
      {
        id: "2",
        subject: "test template",
        body: "test content",
      },
    ];

    localStorage.setItem(
      USER_TEMPLATES_LOCAL_STORAGE_KEY,
      JSON.stringify(userTemplates)
    );

    const result = deleteUserTemplate("1");

    expect(result).toStrictEqual([userTemplates[1]]);
  });

  it("should return the user templates if the template does not exist", () => {
    const userTemplates = [
      {
        id: "1",
        subject: "test template",
        body: "test content",
      },
      {
        id: "2",
        subject: "test template",
        body: "test content",
      },
    ];

    localStorage.setItem(
      USER_TEMPLATES_LOCAL_STORAGE_KEY,
      JSON.stringify(userTemplates)
    );

    const result = deleteUserTemplate("3");

    expect(result).toStrictEqual(userTemplates);
  });
});

describe("#getDefaultTemplates", () => {
  afterEach(() => {
    mockedClient.reset();
    localStorage.clear();
  });

  describe("when there are items on storage for the language", () => {
    it("should return the items on storage", async () => {
      const lang = "en";
      const templates = [
        {
          id: "1",
          subject: "test template",
          body: "test content",
        },
      ];

      const key = getDefaultTemplateLocalStorageKey(lang);

      localStorage.setItem(key, JSON.stringify(templates));

      const result = await getDefaultTemplates({
        language: lang,
      });

      expect(result).toStrictEqual(templates);
    });
  });

  describe("when there are no items on storage for the language", () => {
    it("should fetch the default templates on backend", async () => {
      const lang = "en";

      mockedClient.onGet(`/default-templates?lang=${lang}`).reply(200, [
        {
          id: "1",
          subject: "subject from backend",
          body: "body from backend",
        },
      ]);

      const result = await getDefaultTemplates({
        language: lang,
      });

      expect(result).toStrictEqual([
        {
          id: "1",
          subject: "subject from backend",
          body: "body from backend",
        },
      ]);
    });

    describe("when the endpoint fails to return the information", () => {
      test("the method should return an empty array as response", async () => {
        const lang = "en";

        mockedClient.onGet(`/default-templates?lang=${lang}`).reply(500);

        const result = await getDefaultTemplates({
          language: lang,
        });

        expect(result).toStrictEqual([]);
      });
    });
  });
});
