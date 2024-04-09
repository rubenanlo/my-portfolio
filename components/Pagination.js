import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "next-i18next";
import { Container } from "components/ui/Container";
import { Button } from "components/ui/Button";
import { movePage } from "helpers/usePagination";

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
}) => {
  const { t } = useTranslation("pagination");
  return (
    <>
      <Container.Flex
        className={{
          position: "hidden sm:flex",
          dimension: "w-full",
          flex: "sm:flex-1 sm:items-center sm:justify-between",
        }}
      >
        <Container>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {t("showing")} <span className="font-medium">{startNumber}</span>{" "}
            {t("to")} <span className="font-medium">{endNumber}</span> {t("of")}{" "}
            <span className="font-medium">{totalPosts}</span> {t("results")}
          </p>
        </Container>
        <Container>
          <Container
            as="nav"
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <Button
              variant="arrow"
              onClick={() =>
                movePage("left", currentPage, setCurrentPage, totalPages)
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
            {pageNumbers.map((page) => (
              <Button
                key={page}
                variant="pagination"
                aria-current="page"
                condition={currentPage == page}
                onClick={() => setCurrentPage(page)}
                text={page}
              />
            ))}
            {!hideElipses && (
              <Button
                variant="pagination"
                onClick={() => setShowAllPages(!showAllPages)}
                text="..."
              />
            )}
            <Button
              variant="arrow"
              onClick={() => {
                movePage("right", currentPage, setCurrentPage, totalPages);
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Container>
        </Container>
      </Container.Flex>
    </>
  );
};

export default Pagination;
