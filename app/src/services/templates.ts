import { ITemplate } from "../types/Templates";
import { Api } from "./Api";
import { Logger } from "./Logger";
import { v4 as uuidv4 } from "uuid";

export const USER_TEMPLATES_LOCAL_STORAGE_KEY = "user_templates_gsnipet";

const fetchDefaultTemplates = async (
  language: string
): Promise<ITemplate[]> => {
  try {
    const request = await Api.get("/default-templates?lang=" + language);

    return request.data;
  } catch (error) {
    Logger.log(error);

    return [];
  }
};

export const getDefaultTemplateLocalStorageKey = (language: string) =>
  "default_templates_gsnipet_" + language;

export const getDefaultTemplates = async ({
  language,
}: {
  language: string;
}): Promise<ITemplate[]> => {
  const key = getDefaultTemplateLocalStorageKey(language);

  const templates = localStorage.getItem(key);

  if (templates && templates !== "[]") {
    return JSON.parse(templates);
  }

  const defaultTemplates = await fetchDefaultTemplates(language);

  localStorage.setItem(key, JSON.stringify(defaultTemplates));

  return defaultTemplates;
};

export const getUserTemplates = (): ITemplate[] => {
  const userTemplates = localStorage.getItem(USER_TEMPLATES_LOCAL_STORAGE_KEY);

  return userTemplates ? JSON.parse(userTemplates) : [];
};

export const saveUserTemplate = (template: ITemplate) => {
  const userTemplates = getUserTemplates();

  const exists = userTemplates.find((t) => t.id === template.id);
  let updatedTemplates = userTemplates;

  if (exists) {
    updatedTemplates = updateUserTemplates(template, userTemplates);
  } else {
    updatedTemplates = createUserTemplates(template, userTemplates);
  }

  return updatedTemplates;
};

export const deleteUserTemplate = (id: string) => {
  const userTemplates = getUserTemplates();

  const templates = userTemplates.filter((t) => t.id !== id);

  writesUserTemplatesToLocalStorage(templates);

  return templates;
};

const writesUserTemplatesToLocalStorage = (templates: ITemplate[]) => {
  localStorage.setItem(
    USER_TEMPLATES_LOCAL_STORAGE_KEY,
    JSON.stringify(templates)
  );
};

const updateUserTemplates = (
  template: ITemplate,
  userTemplates: ITemplate[]
) => {
  const newTemplates = userTemplates.map((t) =>
    t.id === template.id ? template : t
  );

  writesUserTemplatesToLocalStorage(newTemplates);

  return newTemplates;
};

const createUserTemplates = (
  template: ITemplate,
  userTemplates: ITemplate[]
) => {
  if (!template.id) {
    template.id = uuidv4();
  }

  const newTemplates = [...userTemplates, template];

  writesUserTemplatesToLocalStorage(newTemplates);

  return newTemplates;
};
