import Link from "next/link";
import clsx from "clsx";

const ChevronRightIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M6.75 5.75 9.25 8l-2.5 2.25"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Post({ as, className, children }) {
  let Component = as ?? "div";

  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

Post.Icon = function PostIcon({ Icon, className, ...props }) {
  return (
    <span className={clsx(className.span)}>
      <Icon {...props} className={clsx(className.component)} />
    </span>
  );
};

Post.Link = function PostLink({ children, ...props }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative">{children}</span>
      </Link>
    </>
  );
};

Post.Title = function PostTitle({ as, href, children, className }) {
  let Component = as ?? "h2";

  return (
    <Component
      className={clsx(
        className,
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
      )}
    >
      {href ? <Post.Link href={href}>{children}</Post.Link> : children}
    </Component>
  );
};

Post.Description = function PostDescription({ children, className }) {
  return (
    <p
      className={clsx(
        className,
        "relative mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      )}
    >
      {children}
    </p>
  );
};

Post.Cta = function PostCta({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Post.Eyebrow = function PostEyebrow({
  as,
  decorate = false,
  className,
  children,
  ...props
}) {
  let Component = as ?? "p";

  return (
    <Component
      className={clsx(
        className,
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
      {children}
    </Component>
  );
};
