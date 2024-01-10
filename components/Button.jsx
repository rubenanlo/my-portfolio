import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

const commonStyle = {
  flex: "inline-flex items-center gap-2 justify-center",
  dimension: "py-2 px-5",
  typography: "text-sm",
  outline: "outline-offset-2",
  otherStyles: "rounded-md transition active:transition-none",
};

const variantStyles = (currentPage) => ({
  primary: {
    background: "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-800",
    typography:
      "font-semibold text-zinc-100 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  },
  secondary: {
    background:
      "bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/50",
    typography:
      "font-medium text-zinc-900 active:text-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50 dark:active:text-zinc-50/70",
  },
  arrow: {
    position: "relative focus:z-20",
    dimension: "px-1",
    typography: "text-gray-400",
    otherStyles: "rounded-r-md focus:outline-offset-0",
  },
  pagination: currentPage
    ? {
        position: "z-10 focus:z-20",
        dimension: "w-8",
        background: "bg-neutral-main bg-orange-tertiary/20",
        typography: "text-zinc-400 font-bold",
        outline:
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
      }
    : {
        position: "hidden focus:z-20",
        dimension: "w-8",
        flex: "items-center md:inline-flex",
        typography: "text-neutral-darkest",
        background: "hover:bg-zinc-700/20",
        outline: "focus:outline-offset-0",
      },
});

export const Button = ({
  variant = "primary",
  className,
  currentPage,
  ...props
}) => {
  className = clsx(
    turnObjectIntoString(variantStyles(currentPage)[variant]),
    turnObjectIntoString(commonStyle),
    className
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
};
