import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

export const Card = ({ children, className, variant, style, ...props }) => {
  const commonStyle = {
    background: "bg-gradient-to-br from-slate-50/50 dark:from-slate-700/50",
    dimension: "mb-5 w-full",
    otherStyles: "shadow-xl mb-5",
  };
  const variants = {
    primary: {
      dimension: "h-full w-auto",
      otherStyles: "rounded-sm",
    },
    secondary: {
      dimension: "mb-5 w-full",
      otherStyles: "rounded-xl",
    },
  };

  const classNameProp = clsx(
    turnObjectIntoString(className),
    turnObjectIntoString(commonStyle),
    turnObjectIntoString(variants[variant])
  );

  return (
    <motion.div
      className={clsx(classNameProp)}
      style={style}
      {...props.animate}
      {...props}
    >
      <div className="p-6 h-full">{children}</div>
    </motion.div>
  );
};

Card.Header = function CardHeader({ as, children, title, className }) {
  let Component = as ?? "div";
  return <Component className={clsx(className)}>{children || title}</Component>;
};

Card.Paragraph = function CardParagraph({ children, className }) {
  return <p className={clsx(className)}>{children}</p>;
};
