import { motion } from "framer-motion";
import clsx from "clsx";
import { showUpAnimation } from "library/animations";

export const Card = ({ children, className, style }) => (
  <div
    className={clsx(className, "rounded-xl bg-white shadow-xl mb-5")}
    style={style}
  >
    <div className="p-6 h-full">{children}</div>
  </div>
);

Card.Stack = function CardStack({ children, as, className }) {
  let Component = as ?? "div";
  return <Component className={clsx(className, "mt-7")}>{children}</Component>;
};

export function AnimatedCardHeader({ children, className }) {
  return (
    <motion.dl
      {...{ ...showUpAnimation, transition: { duration: 1 } }}
      className={clsx(className)}
    >
      {children}
    </motion.dl>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return <dl className={clsx(className)}>{children}</dl>;
};

Card.Paragraph = function CardParagraph({ children, className }) {
  return <p className={clsx(className)}>{children}</p>;
};
