import clsx from "clsx";

export const TextLayout = ({ className, children }) => (
  <div className={clsx(className, "text-zinc-500 dark:text-gray-200")}>
    {children}
  </div>
);

TextLayout.Title = function TextLayoutTitle({ title, className, props }) {
  return (
    <h1
      className={clsx(className, "text-4xl font-bold sm:text-5xl")}
      {...props}
    >
      {title}
    </h1>
  );
};

TextLayout.Subtitle = function TextLayoutSubtitle({
  subtitle,
  className,
  ...props
}) {
  return (
    <h2 className={clsx(className, "text-2xl leading-8 ")} {...props}>
      {subtitle}
    </h2>
  );
};

TextLayout.Paragraph = function TextLayoutParagraph({
  paragraph,
  className,
  ...props
}) {
  return (
    <p className={clsx(className, " text-gray-400")} {...props}>
      {paragraph}
    </p>
  );
};

TextLayout.Tag = function TextLayoutTag({ tag, className }) {
  return (
    <div className="bg-zinc-700 dark:bg-gray-200 rounded-full w-fit px-3">
      <p
        className={clsx(className, " text-gray-300 dark:text-gray-400 text-xs")}
      >
        #{tag}
      </p>
    </div>
  );
};
