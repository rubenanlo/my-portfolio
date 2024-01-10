import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export const Container = ({ children, as, className }) => {
  let Component = as ?? "div";
  return <Component className={clsx(className)}>{children}</Component>;
};

Container.Section = function ContainerSection({
  children,
  className,
  as,
  bottomDiv,
  fullScreen,
}) {
  let Component = as ?? "section";

  return (
    <Component
      className={clsx(
        className,
        bottomDiv ? "pb-14" : "pb-24 sm:pb-32",
        fullScreen ? "h-screen" : "h-auto",
        "relative isolate mx-auto max-w-4xl desktop-sm:max-w-5xl px-6 pt-10 lg:px-8"
      )}
    >
      {children}
    </Component>
  );
};

Container.Columns = function ContainerColumns3({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        className,
        props.columns,
        props.justify,
        props.gapX,
        "grid"
      )}
    >
      {children}
    </div>
  );
};

Container.Flex = function ContainerFlex({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        className,
        props.column && "flex-col",
        props.wrap && "flex-wrap",
        props.justify,
        props.items,
        props.gapX,
        props.gapY,
        "flex"
      )}
    >
      {children}
    </div>
  );
};

Container.AppHeader = function ContainerAppHeader({ children }) {
  return (
    <div>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        {children}
      </div>
      <div className=" border-b border-b-gray-500/50" />
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
    <ul role="list" className={clsx(className.ul, "list-disc  leading-6")}>
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

Container.Animated = forwardRef(function AnimatedContainer(
  { children, className, animation },
  ref
) {
  return (
    <motion.div
      ref={(node) => {
        if (ref) ref.current = node;
      }}
      className={clsx(className)}
      {...animation}
    >
      {children}
    </motion.div>
  );
});

Container.Animated.displayName = "AnimatedContainer";

Container.AnimatedParagraph = function AnimatedParagraph({
  children,
  className,
  animation,
  style,
}) {
  return (
    <motion.p className={className} {...animation} style={style}>
      {children}
    </motion.p>
  );
};

Container.Switch = function SwitchContainer({
  isVisible,
  animationVariants,
  Component,
  className,
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="animatedContent"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={animationVariants}
          className={clsx(
            className,
            "grid grid-rows-2 grid-cols-2 gap-x-5 desktop-sm:flex desktop-sm:flex-col desktop-sm:justify-start desktop-sm:gap-x-0 w-full h-full"
          )}
        >
          <Component />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Container.Wrapper = function ContainerWrapper({ children, filter, href }) {
  return filter ? <div>{children}</div> : <Link href={href}>{children}</Link>;
};
