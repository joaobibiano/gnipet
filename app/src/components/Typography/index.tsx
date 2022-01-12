import clsx from "clsx";

type TypographyProps = {
  children: string;
  className?: string;
};

export const H3 = ({ children, className }: TypographyProps) => (
  <h1 className={clsx(["text-xl text-gray-600 font-medium", className])}>
    {children}
  </h1>
);
