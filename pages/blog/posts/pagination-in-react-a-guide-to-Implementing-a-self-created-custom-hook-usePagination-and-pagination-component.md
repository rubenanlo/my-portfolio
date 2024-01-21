---
title: "Pagination in React: A Guide to Implementing a self-created custom hook (usePagination) and Pagination Component"
description: "Custom hook to easy the pain of creating pagination from scratch"
date: 2023/12/24
category: code
---

# Pagination in React: A Guide to Implementing a self-created custom hook (usePagination) and Pagination Component

Pagination is an important feature for web applications dealing with large datasets or information, as it improves both performance and user experience. In this post, we'll dive into a self-created custom React hook, usePagination, and a Pagination component, hoping to ease the pain for some of you who need Pagination for their projects. For this project, I'm using Nextjs and Tailwind.

## The usePagination Custom Hook

The usePagination hook in React is designed to manage the pagination logic. It's a custom hook that encapsulates the state and logic needed for pagination, thereby promoting reusability and separation of concerns.

### Code Overview:

```javascript

import { useState } from "react";

// Get current items
const setCurrentItems = (currentPage, postsPerPage, items) => {
const indexOfLastItem = currentPage \* postsPerPage;
const indexOfFirstItem = indexOfLastItem - postsPerPage;

return items.slice(indexOfFirstItem, indexOfLastItem);
};

// Setting number of pages
const setNumberOfPages = (totalItems, itemsPerPage) => {
const pageNumbers = [];
const totalPages = Math.ceil(totalItems / itemsPerPage);
for (let i = 1; i <= totalPages; i++) {
pageNumbers.push(i);
}
return { pageNumbers, totalPages };
};

// Set behavior of chevron arrows and nex/previous buttons in screens bigger
// than sm
export const movePage = (move, currentPage, paginate, totalPages) => {
const previousPage = currentPage != 1 ? currentPage - 1 : 1;
const nextPage = currentPage != totalPages ? currentPage + 1 : totalPages;

if (move == "left") paginate(previousPage);
if (move == "right") paginate(nextPage);
return;
};

// Set behavior of the three dotted button
const setThreeDottBehaviour = (
currentPage,
showAllPages,
pageNumbers,
totalPages,
initialNumberOfPages
) => {
if (totalPages <= initialNumberOfPages) initialNumberOfPages = totalPages;
if (currentPage > initialNumberOfPages) initialNumberOfPages = currentPage;
if (!showAllPages) pageNumbers.splice(initialNumberOfPages, totalPages);
return;
};

// Set information for the 'showing x to xx of xx results section
const setInformationResults = (itemsPerPage, currentPage, totalPosts) => ({
startNumber: itemsPerPage _ (currentPage - 1) + 1,
endNumber:
itemsPerPage _ currentPage > totalPosts
? totalPosts
: itemsPerPage \* currentPage,
});

export const usePagination = ({
itemsPerPage,
items,
initialNumberOfPages,
}) => {
const [currentPage, setCurrentPage] = useState(1);
const [showAllPages, setShowAllPages] = useState(false);
const totalPosts = items.length;
const currentPosts = setCurrentItems(currentPage, itemsPerPage, items);

const { pageNumbers, totalPages } = setNumberOfPages(
totalPosts,
itemsPerPage
);

const hideElipses = totalPages <= currentPage || showAllPages ? true : false;

setThreeDottBehaviour(
currentPage,
showAllPages,
pageNumbers,
totalPages,
initialNumberOfPages
);

const { startNumber, endNumber } = setInformationResults(
itemsPerPage,
currentPage,
totalPosts
);

return {
currentPosts,
currentPage,
setCurrentPage,
itemsPerPage,
totalPosts,
pageNumbers,
totalPages,
setShowAllPages,
hideElipses,
startNumber,
endNumber,
};
};
```

The hook consists of several helper functions:

- setCurrentItems: Determines the current items to be displayed based on the current page and items per page.
- setNumberOfPages: Calculates the total number of pages.
- movePage: Handles the functionality of the next/previous buttons and chevron arrows for navigation.
- setThreeDottBehaviour: Manages the display of ellipsis in pagination controls.
- setInformationResults: Provides information for the 'showing x to xx of xx results' section.

### Key Features

- State Management: It uses React's useState hook to manage the current page and visibility of all pages.
- Customization: Offers flexibility in terms of items per page and initial number of pages.

## The Pagination Component

This component, built with Tailwind CSS and Heroicons, provides a user interface for pagination. It utilizes the movePage function from the usePagination hook for navigation.

Code Overview

```javascript

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { movePage } from "/helpers/usePagination";
import clsx from "clsx";

const Pagination = ({
pagination: {
totalPosts,
currentPage,
setCurrentPage,
showAllPages,
setShowAllPages,
hideElipses,
pageNumbers,
totalPages,
startNumber,
endNumber,
},
}) => (
<>

<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
<div>
<p className="text-sm text-gray-700">
Showing <span className="font-medium">{startNumber}</span> to{" "}
<span className="font-medium">{endNumber}</span> of{" "}
<span className="font-medium">{totalPosts}</span> results
</p>
</div>
<div>
<nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
<button
onClick={() =>
movePage("left", currentPage, setCurrentPage, totalPages)
}
className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0" >
<span className="sr-only">Previous</span>
<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
</button>
{pageNumbers.map((page) => (
<button
key={page}
onClick={() => setCurrentPage(page)}
aria-current="page"
className={clsx(
currentPage == page
? " z-10 inline-flex items-center bg-neutral-main bg-orange-tertiary/20 rounded-md text-zinc-400 font-bold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
: " hidden items-center text-neutral-darkest hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0 md:inline-flex",
"relative, px-4 py-2, text-sm"
)} >
{page}
</button>
))}
{!hideElipses && (
<button
onClick={() => setShowAllPages(!showAllPages)}
className={clsx(
showAllPages || currentPage === totalPages ? "hidden" : "block",
"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-zinc-700/20 focus:outline-offset-0"
)} >
...
</button>
)}
<button
onClick={() => {
movePage("right", currentPage, setCurrentPage, totalPages);
}}
href="#"
className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0" >
<span className="sr-only">Next</span>
<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
</button>
</nav>
</div>
</div>
</>
);

export default Pagination;
Design Highlights
Example Code
import Pagination from "components/Pagination";
import { usePagination } from "helpers/usePagination";

const ArticleList = ({ articles }) => {
const { currentPosts, ...pagination } = usePagination({
initialNumberOfPages: 1,
itemsPerPage: 3,
items: articles,
});

return (
<Container.Flex column className="px-2" justify="justify-between">
<Container.Flex column className="gap-16 h-full">
{currentPosts.map((article) => (

<Article key={article.slug} article={article} />
))}
</Container.Flex>
<Pagination pagination={pagination} />
</Container.Flex>
);
};
```

### Key Points

- Flexibility: The hook and component can be easily integrated into different parts of your application.
- Reusability: Both the hook and component are designed to be reusable across various components and contexts.
- **Note that the example code includes custom components. You could change that to whatever html tags you need.**

# Conclusion

Implementing pagination in React applications can significantly improve user experience and performance, especially for data-intensive applications. The usePagination hook and Pagination component provide a robust, flexible, and reusable solution for adding pagination functionality to your React projects.
Remember, the key to effective pagination is not just the implementation but also ensuring it aligns seamlessly with the overall user experience of your application. Happy coding! 🚀
