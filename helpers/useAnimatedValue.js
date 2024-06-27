import { useEffect } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";
const formatNumber = require("helpers/formatData");

export const useAnimatedValue = ({
  from = 0,
  to = 20,
  decimals = 0,
  formatThousands = false,
  animations = { duration: 1, ...animations },
}) => {
  const numberFrom = useMotionValue(from);
  const animatedNumber = useTransform(numberFrom, (value) => {
    if (formatThousands) {
      return formatNumber(value, {
        decimals: decimals,
        thousands: true,
        exponential: true,
      });
    }
    return Number(value.toFixed(decimals));
  });

  useEffect(() => {
    const controls = animate(numberFrom, Number(to), animations);
    return controls.stop;
  }, [to, numberFrom, animations]);

  return animatedNumber;
};
