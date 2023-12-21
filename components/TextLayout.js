import clsx from "clsx";

export const TextLayout = ({ className, children }) => (
  <div className={clsx(className, "text-zinc-500 dark:text-gray-200")}>
    {children}
  </div>
);

TextLayout.Title = function TextLayoutTitle({ title, className }) {
  return (
    <h1 className={clsx(className, "text-4xl font-bold sm:text-5xl")}>
      {title}
    </h1>
  );
};

TextLayout.Subtitle = function TextLayoutSubtitle({ subtitle, className }) {
  return <h2 className={clsx(className, "text-2xl leading-8 ")}>{subtitle}</h2>;
};

TextLayout.Paragraph = function TextLayoutParagraph({ paragraph, className }) {
  return <p className={clsx(className, " text-gray-400")}>{paragraph}</p>;
};
