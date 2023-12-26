import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  movePage,
  setNumberOfPages,
  setThreeDottBehaviour,
  setInformationResults,
} from "/helpers/setupPagination";
import clsx from "clsx";
import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  // Setting number of pages
  const { pageNumbers, totalPages } = setNumberOfPages(
    totalPosts,
    postsPerPage
  );

  // Set behavior of the three dotted button
  const [showAllPages, setShowAllPages] = useState();
  let initialPageNumbers = 3;
  const hideElipses = totalPages <= initialPageNumbers ? true : false;

  setThreeDottBehaviour(
    currentPage,
    showAllPages,
    pageNumbers,
    totalPages,
    initialPageNumbers
  );

  // Set information for the 'showing x to xx of xx results section
  const { initialNumberItems, finalNumberItems } = setInformationResults(
    postsPerPage,
    currentPage,
    totalPosts
  );

  return (
    <>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{initialNumberItems}</span> to{" "}
            <span className="font-medium">{finalNumberItems}</span> of{" "}
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
                movePage("left", currentPage, paginate, totalPages)
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                aria-current="page"
                className={clsx(
                  currentPage == page
                    ? " z-10 inline-flex items-center bg-neutral-main bg-orange-tertiary/20 rounded-md text-zinc-400 font-bold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    : " hidden items-center   text-neutral-darkest  hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0 md:inline-flex",
                  "relative, px-4 py-2, text-sm"
                )}
              >
                {page}
              </button>
            ))}
            {!hideElipses && (
              <button
                onClick={() => setShowAllPages(!showAllPages)}
                className={clsx(
                  showAllPages || currentPage === totalPages
                    ? "hidden"
                    : "block",
                  "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-zinc-700/20 focus:outline-offset-0"
                )}
              >
                ...
              </button>
            )}
            <button
              onClick={() => {
                movePage("right", currentPage, paginate, totalPages);
              }}
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-zinc-700/20 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
