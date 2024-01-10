import { useState } from "react";

// Get current items
const setCurrentItems = (currentPage, postsPerPage, items) => {
  const indexOfLastItem = currentPage * postsPerPage;
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
  startNumber: itemsPerPage * (currentPage - 1) + 1,
  endNumber:
    itemsPerPage * currentPage > totalPosts
      ? totalPosts
      : itemsPerPage * currentPage,
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
