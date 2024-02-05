import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

const commonStyle = {
  flex: "inline-flex items-center gap-2 justify-center",
  dimension: "py-2 px-5",
  typography: "text-sm",
  outline: "outline-offset-2",
  otherStyles: "transition active:transition-none",
};

const variantStyles = (condition) => ({
  primary: {
    background: "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-800",
    typography:
      "font-semibold text-zinc-100 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
    otherStyles: "rounded-md ",
  },
  secondary: {
    background:
      "bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/50",
    typography:
      "font-medium text-zinc-900 active:text-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50 dark:active:text-zinc-50/70",
    otherStyles: "rounded-md ",
  },
  selected: {
    background: "bg-orange-tertiary dark:bg-orange-quaternary",
  },

  arrow: {
    position: "relative focus:z-20",
    dimension: "px-1",
    typography: "text-gray-400",
    otherStyles: "rounded-r-md focus:outline-offset-0",
  },
  pagination: condition
    ? {
        position: "z-10 focus:z-20",
        dimension: "w-8",
        background: "bg-neutral-main bg-orange-tertiary/20",
        typography: "text-zinc-400 font-bold",
        outline:
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 rounded-md",
      }
    : {
        position: "hidden focus:z-20",
        dimension: "w-8",
        flex: "items-center md:inline-flex",
        typography: "text-neutral-darkest",
        background: "hover:bg-zinc-700/20",
        outline: "focus:outline-offset-0 rounded-md",
      },
  login: {
    flex: "flex justify-center",
    typography:
      "text-sm font-semibold leading-6 text-zinc-800 dark:text-orange-primary",
    background:
      "bg-orange-secondary dark:bg-orange-tertiary hover:bg-orange-quaternary dark:hover:bg-orange-quaternary",
    dimension: "w-full px-3 py-1.5",
    focus:
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-secondary",
    otherStyles: "rounded-md shadow-sm",
  },
  theme: {
    position: "fixed bottom-0 right-0 lg:top-0 lg:bottom-auto",
    dimension: "mr-5 mt-3 px-3 py-3 lg:px-2 lg:py-2 mb-5 lg:mb-0",
    background: "bg-white/90 dark:bg-zinc-800/90 ",
    ring: "ring-1 ring-zinc-900/5 dark:ring-white/10 dark:hover:ring-white/20",
    otherStyles:
      "group rounded-md shadow-lg shadow-zinc-800/5 backdrop-blur transition",
  },
  language: {
    flex: "flex justify-center items-center shrink-0",
    dimensions: "w-10 h-10",
    typography: "text-xs font-normal text-gray-800",
    background: condition ? "bg-zinc-800/70" : "hover:bg-zinc-800/70",
  },
  navbarMobile: {
    position: "fixed bottom-0 left-0",
    dimension: "ml-5 mt-3 px-3 py-3 mb-5",
    background: "bg-white/90 dark:bg-zinc-800/90 ",
    ring: "ring-1 ring-zinc-900/5 dark:ring-white/10 dark:hover:ring-white/20",
    otherStyles:
      "group rounded-md shadow-lg shadow-zinc-800/5 backdrop-blur transition",
  },
});

export const Button = ({
  variant = "primary",
  className,
  condition,
  text,
  children,
  ...props
}) => {
  const classNameProps = clsx(
    turnObjectIntoString(variantStyles(condition)[variant]),
    turnObjectIntoString(commonStyle),
    turnObjectIntoString(className)
  );

  return typeof props.href === "undefined" ? (
    <button className={classNameProps} {...props}>
      {text || children}
    </button>
  ) : (
    <Link className={classNameProps} {...props}>
      {children}
      {text}
    </Link>
  );
};
