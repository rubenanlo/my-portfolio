---
title: "Crafting a Responsive UI with Custom React Hooks"
description: "Custom hook to check the browser screen size. Really useful if you are planning to render specific components conditionally to screen size"
date: 2024/01/19
category: code
---

# Crafting a Responsive UI with Custom React Hooks

Today, I will explain a neat little piece of code that can significantly improve how we handle responsive design in React applications. I mainly created it to render components conditionally to the screen size. We'll take a look at a couple of custom React hooks useMediaQuery and useResponsive to understand how they help in creating a responsive UI.

Why custom react Hooks ? Because they allow us to encapsulate logic in reusable functions. They offer a clean way to share logic across multiple components without the messiness of higher-order components or render props.

So lets dive into it.

## The useMediaQuery Hook

The useMediaQuery hook in our example is designed to track the width of the screen and determine if a certain width threshold has been met. Let's break it down:

```javascript
const useMediaQuery = (initialWidth = 768) => {
  const [width, setWidth] = useState(initialWidth);
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [updateTarget, width]);

  return [targetReached, setWidth];
};
```

- useState for Width and Target Reached: We use useState to keep track of the current width and a flag indicating whether the target width has been reached (targetReached).
- Callback for Media Query Change: The updateTarget callback is wrapped with useCallback for performance optimization. It updates targetReached based on whether the media query condition (`max-width: ${width}px`) matches.
- Effect for Media Query Listener: The useEffect hook sets up a media query listener using window.matchMedia. It cleans up by removing the event listener to avoid memory leaks.

## The useResponsive Hook

Next, we have the useResponsive hook:

```javascript
export const useResponsive = (width = 768) => {
  const [isSmallScreen, setWidth] = useMediaQuery(width);

  // Set the width threshold directly when calling the hook
  useEffect(() => {
    setWidth(width);
  }, [width, setWidth]);

  return isSmallScreen;
};
```

This hook simplifies the use of useMediaQuery. It provides a boolean isSmallScreen, indicating whether the screen is below a certain width (default is 768 pixels). It's an abstraction that makes it easier to use in components without worrying about the inner workings of media queries.

## How it works together

Setting the Threshold: When we call useResponsive, we can set our width threshold. This width is then passed to useMediaQuery.
Dynamic Width Update: The useEffect inside useResponsive ensures that if the width threshold changes, useMediaQuery updates its internal state accordingly.
This is an example of how we would use this hook inside a component:

```javascript
const MyComponent = () => {
  const isMobileView = useResponsive(600);

  return <div>{isMobileView ? <MobileView /> : <DesktopView />}</div>;
};
```

## Why this?

This hook allows its reusability, by encapsulating this responsive logic making components cleaner and more focused on their primary function. It also helps with separation of concerns, letting The hooks handle the responsiveness, allowing components to handle rendering and behavior.
And the biggest advantage: You can easily adjust the width threshold as needed, making my life easier.

## Conclusion

In modern web development, responsive design is not just a feature but a necessity. By leveraging the power of these React's custom hooks like useMediaQuery and useResponsive, we can create more maintainable, readable, and reusable code. This approach simplifies the process of making our applications adaptable to different screen sizes, enhancing the overall user experience.

I hope this helps you in your projects!!!
