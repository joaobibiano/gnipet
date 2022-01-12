import { useContext } from "react";

import { TemplateContext } from "../context/TemplateContext";

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);

  return context;
};
