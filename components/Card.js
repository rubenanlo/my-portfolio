import { motion } from "framer-motion";
import clsx from "clsx";

const bgColorCard = "bg-gradient-to-br from-slate-50 dark:from-slate-700";

export const Card = ({ children, className, style }) => (
  <div
    className={clsx(
      className,
      bgColorCard,
      "rounded-xl shadow-xl mb-5 h-52 w-52"
    )}
    style={style}
  >
    <div className="p-6 h-full">{children}</div>
  </div>
);

Card.Stack = function CardStack({ children, as, className }) {
  let Component = as ?? "div";
  return <Component className={clsx(className, "mt-7")}>{children}</Component>;
};

export function AnimatedCard({
  children,
  className,
  classNameText,
  dimensions,
  rounded,
  ...props
}) {
  return (
    <motion.div
      {...props.animate}
      className={clsx(
        className,
        bgColorCard,
        dimensions,
        rounded ? rounded : "rounded-xl",
        "shadow-xl mb-5"
      )}
    >
      <div className={classNameText}>{children}</div>
    </motion.div>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return <div className={clsx(className)}>{children}</div>;
};

Card.Paragraph = function CardParagraph({ children, className }) {
  return <p className={clsx(className)}>{children}</p>;
};
