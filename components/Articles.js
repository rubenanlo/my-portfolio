import dayjs from "dayjs";
import { Container } from "components/Container";
import { Post } from "components/Post";
import Pagination from "components/Pagination";
import { usePagination } from "helpers/usePagination";
import { useResponsive } from "helpers/useResponsive";

const Article = ({ article: { slug, title, date, description } }) => (
  <Post
    as="article"
    className={{
      dimension:
        "w-3/4 lg:w-full shrink-0 p-5 lg:p-0 overflow-x-visible lg:overflow-x-hidden",
      otherStyles: "snap-center",
    }}
  >
    <Container.Link href={`/blog/${slug}`} className="w-full">
      <Post.Title title={title} />
      <Post.Eyebrow
        as="time"
        dateTime={date}
        decorate
        date={dayjs(date).format("MMMM D, YYYY")}
      />
      <Post.Description text={description} />
      <Post.Cta text="Read article" />
    </Container.Link>
  </Post>
);

const ArticleList = ({ articles }) => {
  const itemsPerPage = 3;

  const { currentPosts, ...pagination } = usePagination({
    initialNumberOfPages: 1,
    itemsPerPage: itemsPerPage,
    items: articles,
  });

  const showPagination = articles.length > itemsPerPage;

  return (
    <Container.Flex
      className={{
        position: "mx-auto",
        flex: "flex-col gap-y-5",
        dimension: "mt-2 w-full",
      }}
    >
      <Container.Flex
        className={{
          flex: "gap-y-12 flex-col",
          dimension: "h-full",
        }}
      >
        {currentPosts.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </Container.Flex>
      {showPagination && <Pagination pagination={pagination} />}
    </Container.Flex>
  );
};

export const Carousel = ({ articles }) => (
  <Container.Flex
    className={{
      flex: "gap-x-5",
      dimension: "max-w-sm",
      otherStyles: "snap-mandatory snap-x overflow-x-auto scrollbar-hide pb-2",
    }}
  >
    {articles.map((article) => (
      <Article key={article.slug} article={article} />
    ))}
  </Container.Flex>
);

const Articles = ({ articles }) => {
  const isSmallScreen = useResponsive(1024);
  return isSmallScreen ? (
    <Carousel articles={articles} />
  ) : (
    <ArticleList articles={articles} />
  );
};

export default Articles;
