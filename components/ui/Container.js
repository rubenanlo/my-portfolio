import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";
import images from "public/images.json";

export const Container = ({ children, as, className, ...props }) => {
  let Component = as ?? "div";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component className={clsx(classNameProp)} {...props}>
      {children}
    </Component>
  );
};

export function AnimatedContainer({ children, className, ...props }) {
  const classNameProps = turnObjectIntoString(className);

  return (
    <motion.div {...props} className={clsx(classNameProps)}>
      {children}
    </motion.div>
  );
}

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

Container.Image = function ContainerImage({ className, original }) {
  const classNameProp = turnObjectIntoString(className);

  const { format, ...originalImage } =
    images.find(({ alt }) => alt === original) || {};

  const [imageSrc, setImageSrc] = useState(originalImage);
  const [isFallback, setIsFallback] = useState(false);

  // on error, we only need to change the src from the cloudinary id to a
  // relative path. Ensure that babel has this alias, and that all images are
  // saved in one directory
  const handleError = () => {
    if (isFallback) return;
    setIsFallback(true);
    setImageSrc({
      ...originalImage,
      src: `/assets/${original}.${format}`,
    });
  };

  // Switching component based on whether the image is available on cloudinary
  let Component = isFallback ? Image : CldImage;

  return (
    <Component
      className={clsx(classNameProp)}
      {...imageSrc}
      onError={handleError}
    />
  );
};

Container.Logo = function ContainerLogo({ className, original }) {
  const classNameProp = turnObjectIntoString(className);

  return (
    <Container.Image
      className={clsx(classNameProp, "rounded-full")}
      original={original}
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
  ...props
}) {
  const classNameParent = turnObjectIntoString(className?.parent);
  const classNameChild = turnObjectIntoString(className?.child);

  return (
    <Link
      href={href}
      className={clsx(classNameParent, "cursor-pointer")}
      onClick={onClick}
      {...props}
    >
      {Component && (
        <Component
          className={clsx(classNameChild, "w-auto h-6 fill-zinc-500")}
          {...componentProps}
        />
      )}
      {text || children}
    </Link>
  );
};

Container.List = function ContainerList({
  as,
  list,
  className,
  AdditionalComponent,
}) {
  const ParentComponent = as.parent ?? "ul";
  const classNamePropParent = turnObjectIntoString(className?.parent);

  const ChildComponent = as.child ?? "li";
  const classNamePropChild = turnObjectIntoString(className?.child);

  return (
    <ParentComponent
      role="list"
      className={clsx(classNamePropParent, "leading-6")}
    >
      {list.map((item) => (
        <ChildComponent key={item.id} className={clsx(classNamePropChild)}>
          {AdditionalComponent ? <AdditionalComponent item={item} /> : item}
        </ChildComponent>
      ))}
    </ParentComponent>
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
