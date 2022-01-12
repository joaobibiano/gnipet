import { createContext, useCallback, useEffect, useState } from "react";
import { useLanguageChange } from "../i18n";
import {
  deleteUserTemplate,
  getDefaultTemplates,
  getUserTemplates,
  saveUserTemplate,
} from "../services/templates";
import { ITemplate } from "../types/Templates";

interface IContext {
  defaultTemplates: ITemplate[];
  userTemplates: ITemplate[];
  loading: boolean;
  onSaveUserTemplate: (template: ITemplate) => void;
  onDeleteUserTemplate: (id: string) => void;
  onSelectTemplate: (template: ITemplate) => void;
}

type TemplateContextProviderProps = {
  children: React.ReactNode;
};

export const TemplateContext = createContext<IContext>({
  defaultTemplates: [],
  userTemplates: [],
  loading: false,
  onSaveUserTemplate: () => {},
  onDeleteUserTemplate: () => {},
  onSelectTemplate: () => {},
});

export const TemplateContextProvider = ({
  children,
}: TemplateContextProviderProps) => {
  const [defaultTemplates, setDefaultemplates] = useState<ITemplate[]>([]);
  const [userTemplates, setUserTemplates] = useState<ITemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguageChange();

  const loadsDefaultTemplates = useCallback(async () => {
    const defaults = await getDefaultTemplates({ language });

    return defaults;
  }, [language]);

  useEffect(() => {
    setUserTemplates(getUserTemplates());

    loadsDefaultTemplates().then((response) => {
      setDefaultemplates(response);
      setLoading(false);
    });
  }, [loadsDefaultTemplates]);

  function onSaveUserTemplate(template: ITemplate) {
    const updatedTemplates = saveUserTemplate(template);
    setUserTemplates(updatedTemplates);
  }

  function onDeleteUserTemplate(id: string) {
    const updatedTemplates = deleteUserTemplate(id);
    setUserTemplates(updatedTemplates);
  }

  function onSelectTemplate(template: ITemplate) {
    window.parent.postMessage(
      {
        template,
      },
      "https://mail.google.com/"
    );
  }

  return (
    <TemplateContext.Provider
      value={{
        defaultTemplates,
        userTemplates,
        loading,
        onSaveUserTemplate,
        onDeleteUserTemplate,
        onSelectTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
