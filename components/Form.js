import clsx from "clsx";

export function Form({ as, className, children, ...props }) {
  let Component = as ?? "form";

  return (
    <Component className={clsx(className, "space-y-6")} {...props}>
      {children}
    </Component>
  );
}

// Please ensure that the fields used here are valid HTML input types

Form.Field = function FormField({ field, ...props }) {
  return (
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
          {...props}
          id={field}
          name={field}
          type={field}
          autoComplete={field}
          className="block border-none w-full py-1.5 px-3 shadow-sm bg-transparent placeholder:text-gray-400 focus:ring-0 focus:outline-none  sm:text-sm sm:leading-6 text-gray-50"
        />
      </div>
    </div>
  );
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

Form.Button = function FormButton({ className, text }) {
  return (
    <button
      type="submit"
      className={clsx(
        className,
        "flex w-full justify-center rounded-md text-zinc-800 dark:text-orange-primary bg-orange-secondary dark:bg-orange-tertiary hover:bg-orange-quaternary dark:hover:bg-orange-quaternary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-secondary"
      )}
    >
      {text}
    </button>
  );
};
