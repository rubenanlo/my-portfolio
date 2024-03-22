---
title: "Simplifying Tailwind CSS with Custom Components and Class Object Management"
description: "A custom approach to deal with long classNames strings when working with Tailwind"
date: 2024/03/21
category: code
---

# Simplifying Tailwind CSS with Custom Components and Class Object Management

## Introduction:

Tailwind CSS has revolutionized the way we think about styling in modern web development for quite some time (although some may think that StyleX is going to replace Tailwind - a story for another time). Its utility-first approach allows developers to build complex user interfaces with speed and efficiency. However, as projects grow, we often find ourselves facing a significant challenge: managing lengthy and unwieldy class strings like the one below.

`className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">`

A single element can end up with a barrage of Tailwind classes that make the code difficult to read and maintain. Imagine a button element bloated with classes for padding, margins, colors, hover states, and more. This not only clutters your HTML but can also slow down your development process as you sift through the sea of classes to understand or modify an element's styling.

## My Approach: Custom Components and Class Object Management

I have run into several strategies (all valid and worth checking!). However, different people, different approaches. I couldn't find that one approach that fulfilled my needs. I am a person who needs to read structured code, so that I can easily understand what kind of styling I'm applying to my components.
My journey in finding that one approach that makes me happy 😊 started by looking at Tailwind templates. In there, I noticed that Tailwind folks create custom components to encapsulate the main styling patterns and allow additional styling through props. Specifically, they create reusable components, for example, `Container`, and extending them with variations like `Container.Section` or `Container.Link`.

example:

```javascript
export const Container = ({ children, as, className, ...props }) => {
   let Component = as ?? "div";

   return (
      <Component className={clsx(className, h-f} {...props}>
         {children}
      </Component>
   );
};

Container.Columns = function ContainerColumns({
      children,
      className,
      ...props
   }) {

   return (
      <div className={clsx(className, "grid")} {...props}>
         {children}
      </div>
   );
};

// clsx is an npm library to join strings
```

usage:

```javascript
import { Container } from "components/Container";

const Layout = () => (
  <Container>
    <Container.Flex>{children}</Container.Flex>
  </Container>
);
```

These components are equipped with basic, common classNames, and allow for the injection of additional classNames through props for specific styling needs. I actually create my own, like Container.Flex, or Container.Columns, for any flex or grid components I need to create. This helps identifying where I have flex or grid applied, when reading my code.

However, this didn't quite give me entirely what I was looking for, since I still have the issue of long strings. I combined their approach with managing classNames through Javascript objects, like this one:

```javascript
<Container
  classNames={{
    dimension: "w-20",
    border: "border border-gray-900",
    typography: "text-sm text-gray-100",
  }}
>
  {children}
</Container>
```

This approach allows me to easily read through my styles now. However, when I pass this onto the `Container` component through props, I needed to turn an object into a string. For some cases, I could even have only a string in classNames if I don't have too many classNames to show (see below). Therefore, I needed to create a custom function in order to turn an object into a string or keep a string as such for cases where I'm only passing strings through the classNames property.

```javascript
<Container classNames='h-full'
   {children}
</Container>
```

That function is as simple as this:

```javascript
export const turnObjectIntoString = (className) => {
  if (className === undefined) return;
  if (typeof className === "string") return className;
  return Object.values(className).join(" ");
};
```

Now, my custom components and their usage would look like this:
Custom components:

```javascript
export const Container = ({ children, as, className, ...props }) => {
  let Component = as ?? "div";
  const classNameProp = turnObjectIntoString(className);
  return (
    <Component className={clsx(classNameProp)} {...props}>
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
```

Usage:

```javascript
import { Container } from "components/Container";

const Layout = () => (
  <Container
    className={{
      position: "mx-auto",
      dimension: "max-w-sm lg:max-w-4xl desktop-sm:max-w-6xl",
      typography: "font-lato text-gray-200",
    }}
  >
    <Container.Flex
      className={{
        flex: "flex-col justify-between",
        dimension: "min-h-[90vh] mt-[10vh] rounded-t-2xl",
        background:
          "bg-gray-100 dark:bg-gray-900/80 border-t border-r border-l border-zinc-100/20",
      }}
    >
      {children}
    </Container.Flex>
  </Container>
);
```

## Advantages

Readability: This approach significantly enhances code readability for me. For instance, seeing `Container.Flex` or `Container.Columns` in the JSX immediately tells me about the element's layout without having to parse through individual classes.
Maintainability: It simplifies the maintenance of styles. Changes can be made in a single location (the class object), reflecting wherever the object is used.
Compilation Benefits: While this method introduces more JavaScript code, it can actually aid in compiling the code more efficiently. Tailwind's JIT mode can optimize the final CSS bundle by including only the classes that are actually used in these objects, potentially reducing the size of the final CSS file.

## Conclusion

While my approach might seem to go against the DRY (Don't Repeat Yourself) principle by introducing additional code, it effectively addresses the core issues of readability and maintainability in large projects using Tailwind CSS. By leveraging custom components and a class object management system, we can create a more structured and intuitive way to handle styling in our applications. This method not only makes our codebase more accessible to developers but can also contribute to performance improvements through more efficient style compilation. Embracing such strategies can significantly enhance our development workflow, making our projects more scalable and easier to work with.
