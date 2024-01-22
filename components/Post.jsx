import Link from "next/link";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { turnObjectIntoString } from "helpers/manipulateText";

export function Post({
  as,
  className,
  children,
  narrowWidth,
  sameHeight,
  ...props
}) {
  let Component = as ?? "div";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component
      className={clsx(
        classNameProp,
        narrowWidth ? "p-5" : "lg:border-none lg:rounded-none p-5 lg:p-0",
        sameHeight && "h-full",
        "group relative flex flex-col items-start rounded-2xl border border-zinc-100 dark:border-zinc-700/60"
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

Post.Icon = function PostIcon({ Icon, className, ...props }) {
  const classNameParent = turnObjectIntoString(className.parent);
  const classNameChild = turnObjectIntoString(className.child);

  return (
    <span className={clsx(classNameParent)}>
      <Icon
        {...props}
        className={clsx(classNameChild, "text-zinc-800 dark:text-zinc-400")}
      />
    </span>
  );
};

Post.Link = function PostLink({ children, ...props }) {
  return (
    <>
      <Link {...props}>{children}</Link>
    </>
  );
};

Post.Title = function PostTitle({ as, href, title, className }) {
  let Component = as ?? "h2";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component
      className={clsx(
        classNameProp,
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
      )}
    >
      {href ? <Post.Link href={href}>{title}</Post.Link> : title}
    </Component>
  );
};

Post.Description = function PostDescription({ className, text, ...props }) {
  const classNameProp = turnObjectIntoString(className);

  return (
    <p
      className={clsx(
        classNameProp,
        "relative mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      )}
      {...props}
    >
      {text}
    </p>
  );
};

Post.Cta = function PostCta({ text, noChevron }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-4 flex items-center text-sm font-medium text-orange-tertiary"
    >
      {text}
      {noChevron ? null : (
        <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
      )}
    </div>
  );
};

Post.Eyebrow = function PostEyebrow({
  as,
  decorate = false,
  className,
  date,
  ...props
}) {
  let Component = as ?? "p";

  return (
    <Component
      className={clsx(
        turnObjectIntoString(className),
        "relative order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {date}
    </Component>
  );
};
