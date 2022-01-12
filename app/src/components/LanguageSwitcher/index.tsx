import { useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  setLanguage as setGlobalLanguage,
} from "../../i18n";
import clsx from "clsx";

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const onChangeLanguage = (language: string) => {
    setLanguage(language);
    setGlobalLanguage(language);
  };

  return (
    <div>
      {LANGUAGES.map((item) => (
        <Button
          key={item}
          onClick={() => onChangeLanguage(item)}
          selected={item === language}
        >
          {item.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

type ButtonProps = {
  children: string;
  onClick: () => void;
  selected: boolean;
};

const Button = ({ children, onClick, selected }: ButtonProps) => {
  return (
    <button
      title={`language_button_${children}`}
      className={clsx({
        "w-6 text-gray-400": true,
        underline: selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
