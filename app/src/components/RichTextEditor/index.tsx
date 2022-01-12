import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type RichTextEditorProps = {
  onChange: (value: string) => void;
  value: string;
};

export const RichTextEditor = ({ onChange, value }: RichTextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      id="editor"
      data-testid="rich-text-editor"
      className="flex flex-col h-40"
    />
  );
};
