import sanitizeHtml from "sanitize-html";
import { ITemplate } from "../../../types/Templates";
import { H3 } from "../../Typography";
import {
  MdOutlineRemoveRedEye,
  MdOutlineClose,
  MdOutlineEdit,
  MdDeleteOutline,
} from "react-icons/md";
import { useState } from "react";
import { useTranslate } from "../../../i18n";
import { TemplateEditor } from "../../TemplateEditor";
import { useTemplateContext } from "../../../hooks/useTemplateContext";

type SectionProps = {
  templates: ITemplate[];
  title: string;
  loading?: boolean;
  canEdit?: boolean;

  actionButton?: React.ReactNode;
  onSelectItem?: (item: ITemplate) => void;
  onDelete?: (id: string) => void;
  className?: string;
};

const Section = ({
  templates,
  loading,
  title,
  onSelectItem,
  actionButton,
  canEdit,
  onDelete,
  className,
}: SectionProps) => {
  const { onSaveUserTemplate } = useTemplateContext();
  const [itemDetail, setItemDetail] = useState<ITemplate>();
  const [itemToEdit, setItemToEdit] = useState<ITemplate>();

  const { t } = useTranslate();

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (itemToEdit) {
    return (
      <TemplateEditor
        onClose={() => setItemToEdit(undefined)}
        onSave={(template) => {
          onSaveUserTemplate(template);
          setItemToEdit(undefined);
        }}
        template={itemToEdit}
      />
    );
  }

  if (itemDetail) {
    return (
      <div className="fixed top-0 left-0 bg-white overflow-scroll p-4 h-full w-full z-20">
        <div className="flex justify-between items-center pb-6">
          <H3>{itemDetail.subject}</H3>

          <button
            title={t("ariaLabel.sectionCloseDetailButton")}
            className="text-2xl"
            onClick={() => setItemDetail(undefined)}
          >
            <MdOutlineClose />
          </button>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(itemDetail.body),
          }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex space-x-2 pb-3">
        <H3>{title}</H3>
        {actionButton}
      </div>

      {templates.length === 0 && (
        <p className="text-sm text-gray-500">{t("noTemplatesFound")}</p>
      )}

      {templates.map((item) => (
        <div className="flex justify-between space-x-2" key={item.id}>
          <button
            onClick={() => onSelectItem?.(item)}
            className="flex-1 text-left text-sm hover:underline"
            title={t("ariaLabel.sectionSelectItemButton")}
          >
            <span>{item.subject}</span>
          </button>

          <button
            title={t("ariaLabel.sectionDetailItemButton")}
            onClick={() => setItemDetail(item)}
          >
            <MdOutlineRemoveRedEye className="cursor-pointer text-xl hover:text-blue-500 text-gray-400" />
          </button>

          {canEdit && (
            <button
              title={t("ariaLabel.sectionEditItemButton")}
              onClick={() => setItemToEdit(item)}
            >
              <MdOutlineEdit className="cursor-pointer text-xl hover:text-blue-500 text-gray-400" />
            </button>
          )}

          {canEdit && (
            <button
              title={t("ariaLabel.sectionDeleteItemButton")}
              onClick={() => item.id && onDelete?.(item.id)}
            >
              <MdDeleteOutline className="cursor-pointer text-xl hover:text-blue-500 text-gray-400" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Section;
