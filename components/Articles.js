import dayjs from "dayjs";
import clsx from "clsx";
import { Container } from "components/Container";
import { Post } from "components/Post";
import Pagination from "components/Pagination";
import { usePagination } from "helpers/usePagination";
import { useResponsive } from "helpers/useResponsive";
import { Show } from "./Show";

export const Article = ({
  article: { slug, href, title, name, date, image, description },
  narrowWidth,
  fullWidth,
}) => (
  <Post
    narrowWidth={narrowWidth}
    fullWidth={fullWidth}
    as="article"
    className={{
      grid: clsx(image ? "row-span-2" : ""),
      dimension: "shrink-0 overflow-x-visible lg:overflow-x-hidden",
      otherStyles: "snap-center",
    }}
  >
    <Container.Link
      href={slug ? `/blog/${slug}` : href}
      className={{ parent: "h-full flex flex-col justify-between" }}
    >
      <Post.Title title={title || name} />
      <Show>
        <Show.When isTrue={date !== false}>
          <Post.Eyebrow
            as="time"
            dateTime={date}
            decorate
            date={dayjs(date).format("MMMM D, YYYY")}
          />
        </Show.When>
      </Show>
      <Post.Description text={description} />
      <Post.Cta noChevron text={href ?? "Read article"} />
      {image && (
        <Container.Image
          src={image}
          alt={title || name}
          className={{
            dimension: "mt-5",
            otherStyles: "object-cover object-left-top opacity-30 rounded-lg ",
          }}
        />
      )}
    </Container.Link>
  </Post>
);

const ArticleList = ({ articles }) => {
  const itemsPerPage = 4;

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

export const Carousel = ({ articles, narrowWidth }) => (
  <Container.Flex
    className={{
      flex: clsx(narrowWidth ? "gap-x-20" : "gap-x-5"),
      dimension: "max-w-sm",
      otherStyles: clsx(
        narrowWidth
          ? ""
          : "snap-mandatory snap-x overflow-x-auto scrollbar-hide",
        "pb-2"
      ),
    }}
  >
    {articles.map((article) => (
      <Article key={article.slug} article={article} narrowWidth />
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
