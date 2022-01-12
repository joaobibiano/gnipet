import { useState } from "react";

import { useTranslate } from "../../i18n";
import { ITemplate } from "../../types/Templates";
import { RichTextEditor } from "../RichTextEditor";

type TemplateEditorProps = {
  onSave: (template: ITemplate) => void;
  onClose: () => void;
  template?: ITemplate;
};

export const TemplateEditor = ({
  template,
  onClose,
  onSave,
}: TemplateEditorProps) => {
  const { t } = useTranslate();
  const [body, setBody] = useState(template?.body ?? "");
  const [subject, setSubject] = useState(template?.subject ?? "");

  return (
    <div className="fixed top-0 left-0 right-0 bg-white overflow-scroll p-4 h-full z-20">
      <form
        aria-label={t("ariaLabel.templateEditor")}
        onSubmit={(ev) => {
          ev.preventDefault();

          onSave({
            body,
            subject,
            id: template?.id,
          });
        }}
      >
        <label htmlFor="subject">{t("subject")}</label>
        <input
          id="subject"
          type="text"
          className="p-2 border border-gray-300 w-full mb-3"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor="editor">{t("body")}</label>
        <RichTextEditor value={body} onChange={setBody} />

        <div className="flex justify-between">
          <button
            title={t("ariaLabel.editorSaveButton")}
            type="submit"
            className="flex items-center bg-blue-600 text-white rounded px-4 py-2 mt-6 hover:shadow-lg"
          >
            {t("save")}
          </button>
          <button
            title={t("ariaLabel.editorCloseButton")}
            onClick={onClose}
            className="flex items-center bg-gray-500 text-white rounded px-4 py-2 mt-6 hover:shadow-lg"
          >
            {t("close")}
          </button>
        </div>
      </form>
    </div>
  );
};
