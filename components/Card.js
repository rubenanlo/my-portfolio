import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

export const Card = ({ children, className, variant, style, ...props }) => {
  const commonStyle = {
    background: "bg-gradient-to-br from-slate-50 dark:from-slate-700",
    dimension: "mb-5 w-full",
    otherStyles: "rounded-xl shadow-xl mb-5",
  };
  const variants = {
    fixedHeight: {
      dimension: "h-52 w-52",
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
