import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

export function Form({ as, className, children, ...props }) {
  let Component = as ?? "form";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component className={clsx(classNameProp, "space-y-6")} {...props}>
      {children}
    </Component>
  );
}

// Please ensure that the fields used here are valid HTML input types
Form.Field = function FormField({
  field,
  variant = "primary",
  placeholder = field,
  required = false,
  onChange,
}) {
  const variantComponents = {
    primary: (
      <input
        type={field}
        placeholder={placeholder}
        aria-label={field}
        autoComplete={field}
        required={required}
        className={turnObjectIntoString({
          flex: "flex-auto",
          dimension: "min-w-0 py-[calc(theme(spacing.2)-1px)] px-3",
          background: "bg-white dark:bg-zinc-700/[0.15]",
          typography:
            "sm:text-sm placeholder:text-zinc-400 dark:text-zinc-200 dark:placeholder:text-zinc-500",
          border:
            "border border-zinc-900/10 focus:border-teal-500 dark:border-zinc-700 dark:focus:border-teal-400",
          ring: "dark:focus:ring-teal-400/10 focus:ring-4 focus:ring-teal-500/10",
          otherStyles:
            "appearance-none rounded-md shadow-md shadow-zinc-800/5 focus:outline-none",
        })}
        onChange={onChange}
      />
    ),
    secondary: (
      <div>
        <div
          className={turnObjectIntoString({
            flex: "flex items-center",
            position: "relative top-[1.27rem]",
          })}
        >
          <div
            className={turnObjectIntoString({
              dimension: "w-3",
              border: "border-b border-zinc-800 dark:border-zinc-400",
            })}
          />
          <label
            htmlFor={field}
            className={turnObjectIntoString({
              position: "block",
              dimension: "shrink-0  px-2",
              typography:
                "text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-400",
            })}
          >
            {field}
          </label>
          <div
            className={turnObjectIntoString({
              dimension: "w-full",
              border: "border-b border-zinc-800 dark:border-zinc-400",
            })}
          />
        </div>
        <div
          className={turnObjectIntoString({
            dimension: "mt-2",
            border:
              "rounded-b-sm border-b border-x border-zinc-800 dark:border-zinc-400",
          })}
        >
          <input
            id={field}
            name={field}
            type={field}
            autoComplete={field}
            className={turnObjectIntoString({
              position: "block",
              dimension: "w-full py-1.5 px-3",
              background: "bg-transparent",
              border: "border-none",
              typography:
                "placeholder:text-gray-400 sm:text-sm sm:leading-6 text-gray-50",
              otherStyles: "shadow-sm focus:ring-0 focus:outline-none",
            })}
            onChange={onChange}
          />
        </div>
      </div>
    ),
  };
  return variantComponents[variant];
};

Form.Checkbox = function FormCheckbox({ field, text, ...props }) {
  return (
    <div className="flex items-center">
      <input
        id={field}
        name={field}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-30"
        {...props}
      />
      <label
        htmlFor={field}
        className="ml-3 block text-sm leading-6 text-zinc-500 dark:text-orange-tertiary"
      >
        {text}
      </label>
    </div>
  );
};
