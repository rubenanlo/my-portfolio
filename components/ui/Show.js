import { Children, isValidElement, cloneElement } from "react";

// This component handles when to show or hide children based on the `isTrue`
// prop. This accounts for two possible scenarios: If we want to use a
// short-circuit rendering (i.e., &&) or a ternary conditional rendering (i.e.,
// ? :).

// 1. Short-circuit rendering: This is the default behavior. The isTrue prop
//    only accepts an array of boolean values. If you don't need to render any
//    DOM element when the condition is false, you need to use this approach so
//    that an empty HTML is not generated in the DOM.

// 2. Ternary conditional rendering: If you want to use a ternary conditional
//    rendering, you have to use the `ternary` prop, along with Show.When,
//    Show.Else. The isTrue prop needs to be a boolean in this case

// Usage:
// Short-circuit rendering:
// <Show isTrue={[true, false]}>
//   <div>Visible</div>
//   <div>Hidden</div>
// </Show>
// Ternary conditional rendering:
// <Show ternary>
//   <Show.When isTrue={true}>
//     <div>Visible</div>
//   </Show.When>
//   <Show.Else>
//     <div>Hidden</div>
//   </Show.Else>

export const Show = ({ ternary, isTrue, children }) => {
  if (ternary) return <ShowTernary {...{ isTrue, children }} />;
  return <ShowShortCircuit {...{ isTrue, children }} />;
};

/** Short-circuit rendering approach
 *
 * @param {Object} props - The component props.
 * @param {boolean[]} props.isTrue - An array of boolean values determining visibility of corresponding children.
 * @param {React.ReactNode} props.children - The child elements to be conditionally rendered.
 * @returns {JSX.Element} The rendered children that comply with the conditions specified in `isTrue`.
 *
 * Note: The `Show` component works as long as the variables being checked are located in the first layer of children.
 */

const ShowShortCircuit = ({ isTrue, children }) => {
  const renderChildren = (children, isTrue, indexRef) => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      const currentCondition = isTrue[indexRef.current];
      indexRef.current += 1;

      if (!currentCondition) {
        return null;
      }

      if (child.props.children) {
        const nestedChildren = renderChildren(
          child.props.children,
          isTrue,
          indexRef
        );
        return cloneElement(child, { children: nestedChildren });
      }

      return child;
    });
  };

  const indexRef = { current: 0 };
  return <>{renderChildren(children, isTrue, indexRef)}</>;
};

/**
 * Short-circuit rendering approach
 *
 * @param {Object} props - The component props.
 * @param {boolean[]} props.isTrue - An array of boolean values determining visibility of corresponding children.
 * @param {React.ReactNode} props.children - The child elements to be conditionally rendered.
 * @returns {JSX.Element} The rendered children that comply with the conditions specified in `isTrue`.
 *
 * Note: The `Show` component works as long as the variables being checked are located in the first layer of children.
 */

const ShowTernary = (props) => {
  let when = null;
  let otherwise = null;

  Children.forEach(props.children, (child) => {
    if (child.props.isTrue === undefined) {
      otherwise = child;
    } else if (!when && child.props.isTrue === true) {
      when = child;
    }
  });

  return when || otherwise;
};

// Use the below ONLY if you want to use the ternary conditional rendering
// approach.
Show.When = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ render, children }) => render || children;
