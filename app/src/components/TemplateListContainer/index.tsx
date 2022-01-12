import { useTemplateContext } from "../../hooks/useTemplateContext";

import Section from "./Section";
import { useTranslate } from "../../i18n";
import { AddTemplate } from "../AddTemplate";

const TemplateListContainer = () => {
  const {
    loading,
    defaultTemplates,
    userTemplates,
    onDeleteUserTemplate,
    onSelectTemplate,
  } = useTemplateContext();
  const { t } = useTranslate();

  return (
    <div>
      <Section
        loading={loading}
        templates={defaultTemplates}
        title={t("defaultTemplates")}
        onSelectItem={onSelectTemplate}
        className="pb-6"
      />

      <Section
        loading={false}
        canEdit
        templates={userTemplates}
        title={t("userTemplates")}
        actionButton={<AddTemplate />}
        onDelete={onDeleteUserTemplate}
        onSelectItem={onSelectTemplate}
        className="pb-6"
      />
    </div>
  );
};

export default TemplateListContainer;
