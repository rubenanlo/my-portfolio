## Custom hooks:

### usePagination:

If you want to leverage this hook along with all the logic, you will need to levearge code from `usePagination`, Pagination component and Button component.

Check the ArticleList component within the index page to see how to use the custom hook.

## Dealing with Tailwind classNames:

When using custom components please use the following structure for tailwind classNames. for any categories other than position, flex, grid, dimension, background, typography, if there is more than 2 classnames, create its specific category.

```javascript
<CustomComponent
  className={{
    position: "relative left-xxx, right-xxxx, m-20, p-20, etc" // anything related to positioning an element node
    flex: "flex-col etc" // anything related to flex classNames
    grid: "grid-cols-1 sm:grid-cols-2 gap-x-2" /// anything related to grids
    dimension: "h-10, w-10, max-w-xxx, min-h-xxx ...", // here anything related to dimensions
    background: "bg-gradient-to-r from-[#fafbfb] to-[#000000]", // here anything related to background including.
    typography: "" // here any clasname related to text
    overflow: "overflow-x-auto" // anything related to overflow only
    ring: "" //anything related to ring.
    otherStyles: "opacity-30",
  }}
/>
```

If a specific component has the same type of classNames, then use a string instead:

```javascript
<Container
  className="pt-10 mt-20 max-w-xxx" // all classnames refer to positioning only
  ...
/>
```

## Some specifics for certain components

The button component allows you to have either children or text as props. Use children if you expect to have children components (e.g., span, images, etc). And use the text props when there are no children components.

## Helpers:

### getText:

Helps retreiving text from files. a couple of aspects:

- When calling `getAllText` it allows an object with specific properties as parameters: withSummarizedContent, and page. Example:
  ```javascript
  const text = getAllText({ withSummarizedText, page: "blog" });
  ```
- The same goes for getText function:
  ```javascript
  const text = getText({ slug: "slug", withSummarizedText, page: "about" });
  ```

## Images

Watermark
Icon
Card
