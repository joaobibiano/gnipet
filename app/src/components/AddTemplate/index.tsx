import { useState } from "react";
import { MdControlPoint } from "react-icons/md";
import { useTemplateContext } from "../../hooks/useTemplateContext";
import { useTranslate } from "../../i18n";
import { TemplateEditor } from "../TemplateEditor";

export const AddTemplate = () => {
  const [editorOpen, setEditorOpen] = useState(false);
  const { onSaveUserTemplate } = useTemplateContext();
  const { t } = useTranslate();

  if (editorOpen) {
    return (
      <TemplateEditor
        onClose={() => setEditorOpen(false)}
        onSave={(template) => {
          onSaveUserTemplate(template);
          setEditorOpen(false);
        }}
      />
    );
  }

  return (
    <button
      onClick={() => setEditorOpen(true)}
      title={t("ariaLabel.addTemplateButton")}
    >
      <MdControlPoint className="text-3xl text-green-600 transition duration-150 ease-out hover:-translate-y-1" />
    </button>
  );
};
