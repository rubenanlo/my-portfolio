// Get current items
export const setCurrentItems = (currentPage, postsPerPage, items) => {
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;

  console.log(items.slice(indexOfFirstItem, indexOfLastItem));
  return items.slice(indexOfFirstItem, indexOfLastItem);
};

// Setting number of pages
export const setNumberOfPages = (totalItems, itemsPerPage) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return { pageNumbers, totalPages };
};

// Set behaviour of chevron arrows and nex/previous buttons in screens bigger
// than sm
export const movePage = (move, currentPage, paginate, totalPages) => {
  const previousPage = currentPage != 1 ? currentPage - 1 : 1;
  const nextPage = currentPage != totalPages ? currentPage + 1 : totalPages;

  if (move == "left") paginate(previousPage);
  if (move == "right") paginate(nextPage);
  return;
};

// Set behavior of the three dotted button
export const setThreeDottBehaviour = (
  currentPage,
  showAllPages,
  pageNumbers,
  totalPages,
  initialPageNumbers
) => {
  if (totalPages <= initialPageNumbers) initialPageNumbers = totalPages;
  if (currentPage > initialPageNumbers) initialPageNumbers = currentPage;
  if (!showAllPages) pageNumbers.splice(initialPageNumbers, totalPages);
  return;
};

// Set information for the 'showing x to xx of xx results section
export const setInformationResults = (
  itemsPerPage,
  currentPage,
  totalPosts
) => ({
  initialNumberItems: itemsPerPage * (currentPage - 1) + 1,
  finalNumberItems:
    itemsPerPage * currentPage > totalPosts
      ? totalPosts
      : itemsPerPage * currentPage,
});
