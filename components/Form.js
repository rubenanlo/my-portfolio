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
}) {
  const variantComponents = {
    primary: (
      <input
        type={field}
        placeholder={placeholder}
        aria-label={field}
        autoComplete={field}
        required={required}
        className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
      />
    ),
    secondary: (
      <div>
        <div className="flex items-center relative top-[1.27rem]">
          <div className="border-b border-zinc-800 dark:border-zinc-400 w-3" />
          <label
            htmlFor={field}
            className="block shrink-0 text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-400 px-2"
          >
            {field}
          </label>
          <div className="border-b w-full border-zinc-800 dark:border-zinc-400" />
        </div>
        <div className="mt-2 rounded-b-sm border-b border-x border-zinc-800 dark:border-zinc-400">
          <input
            id={field}
            name={field}
            type={field}
            autoComplete={field}
            className="block border-none w-full py-1.5 px-3 shadow-sm bg-transparent placeholder:text-gray-400 focus:ring-0 focus:outline-none  sm:text-sm sm:leading-6 text-gray-50"
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
