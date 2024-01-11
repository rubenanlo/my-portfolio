import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

export const Container = ({ children, as, className, ...props }) => {
  let Component = as ?? "div";
  const classNameProp = turnObjectIntoString(className);
  return (
    <Component className={clsx(classNameProp)} {...props}>
      {children}
    </Component>
  );
};

Container.Section = function ContainerSection({
  children,
  className,
  as,
  bottomDiv,
  ...props
}) {
  let Component = as ?? "section";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component
      className={clsx(
        classNameProp,
        bottomDiv ? "pb-14" : "pb-24 sm:pb-32",
        "relative isolate mx-auto max-w-4xl desktop-sm:max-w-5xl px-6 pt-10 lg:px-8"
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.Columns = function ContainerColumns({
  children,
  className,
  ...props
}) {
  const classNameProp = turnObjectIntoString(className);
  return (
    <div className={clsx(classNameProp, "grid")} {...props}>
      {children}
    </div>
  );
};

Container.Flex = function ContainerFlex({ children, className, ...props }) {
  const classNameProp = turnObjectIntoString(className);
  return (
    <div
      className={clsx(
        classNameProp,
        "flex",
        className?.flex === undefined && "flex-row justify-between items-center"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.Logo = function ContainerLogo({ className, ...props }) {
  return (
    <Image
      className={clsx(className, "rounded-full")}
      src={props.src}
      alt={props.alt}
    />
  );
};

Container.Link = function ContainerLink({
  children,
  text,
  className,
  href,
  onClick,
  Component,
  componentProps,
}) {
  return (
    <Link
      href={href}
      className={clsx(className?.text, "cursor-pointer")}
      onClick={onClick}
    >
      {Component && (
        <Component
          className={clsx(className?.component, "w-auto h-7 fill-zinc-500")}
          {...componentProps}
        />
      )}
      {text || children}
    </Link>
  );
};

Container.List = function ContainerList({ list, className, Component }) {
  return (
    <ul role="list" className={clsx(className.ul, "leading-6")}>
      {list.map((item) => (
        <li key={item} className={clsx(className.li)}>
          {Component(item)}
          {item}
        </li>
      ))}
    </ul>
  );
};

Container.Table = function ContainerTable({ table, className }) {
  return (
    <table
      className={clsx(
        className.table,
        "max-w-sm mx-auto whitespace-nowrap mb-5"
      )}
    >
      <colgroup>
        {table.th.map((header, index) => (
          <col
            key={header}
            className={clsx(
              className.col,
              index === 0 ? className.col.first : className.col.rest
            )}
          />
        ))}
      </colgroup>
      <thead className={clsx(className.thead, "text-sm")}>
        <tr>
          {table.th.map((header) => (
            <th key={header} scope="col" className={clsx(className.th)}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={className.tbody}>
        {table.tr.map((row, index) => (
          <tr key={row}>
            {row.td.map((cell) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
