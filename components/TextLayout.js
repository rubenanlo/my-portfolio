import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

export const TextLayout = ({ className, children }) => (
  <div className={clsx(className, "text-zinc-500 dark:text-gray-200")}>
    {children}
  </div>
);

TextLayout.Title = function TextLayoutTitle({
  as,
  title,
  AdditionalComponent,
  className,
  props,
}) {
  const Component = as ?? "h1";
  const classNameProp = turnObjectIntoString(className);

  const variants = {
    h1: "text-4xl font-bold sm:text-5xl",
    h2: "text-2xl sm:text-3xl",
    h3: "text-xl sm:text-2xl",
    h4: "text-sm font-semibold text-zinc-900 dark:text-zinc-100",
  };

  return (
    <Component className={clsx(classNameProp, variants[as])} {...props}>
      {AdditionalComponent}
      {title}
    </Component>
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
  const classNameProp = turnObjectIntoString(className);

  return (
    <p
      className={clsx(classNameProp, "text-zinc-600 dark:text-zinc-400")}
      {...props}
    >
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
