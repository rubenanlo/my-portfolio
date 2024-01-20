import { capitalize } from "lodash";
import clsx from "clsx";
import { Container } from "components/Container";
import { getAllText } from "helpers/getTextForSlug";
import { Carousel } from "components/Articles";
import { TextLayout } from "components/TextLayout";
import { useAnimatedValue } from "helpers/useAnimatedValue";
import { blurAnimation } from "library/animations";

const Blog = ({ articles }) => {
  const groupArticles = articles.reduce((acc, article) => {
    // Check if the category is already present in the accumulator array
    if (!acc.some((group) => group.category === article.category)) {
      // If not present, filter the articles for this category and add the group
      const group = articles.filter(
        (item) => item.category === article.category
      );
      acc.push({ category: article.category, posts: group });
    }
    return acc;
  }, []);

  const tags = groupArticles.reduce((acc, article) => {
    acc.push(article.category);
    return acc;
  }, []);

  const totalPosts = articles.length;

  const animatedTotalPosts = useAnimatedValue({
    from: 0,
    to: totalPosts,
    formatThousands: true,
    animations: { duration: 0.5 },
  });

  return (
    <Container.Columns
      className={{
        position: "relative",
        grid: "grid-cols-1 lg:grid-cols-[1fr,1.5fr]",
        dimension: "h-full",
        otherStyles: "overflow-x-hidden",
      }}
    >
      <Container className="mt-10 lg:mt-20 px-16">
        <TextLayout.Title as="h1" title="My blog" />
        <TextLayout.Paragraph
          as="h3"
          paragraph="A place where I share my thoughts related to web development, programming, and other topics."
          className="mt-5"
        />
        <Container.Flex className={{ flex: "justify-start items-end gap-x-2" }}>
          <TextLayout.Number
            animations={blurAnimation}
            className="mt-6 text-7xl"
          >
            {animatedTotalPosts}
          </TextLayout.Number>
          <TextLayout.Paragraph paragraph="published blog posts" className="" />
        </Container.Flex>
        <Container.Columns className="gird-cols-1 grid-cols-[1fr,2fr] items-center mt-10">
          <TextLayout.Paragraph paragraph="I talk about:" />
          <Container.Flex className={{ flex: "justify-start gap-5 flex-wrap" }}>
            {tags.map((tag) => (
              <TextLayout.Tag key={tag} tag={tag} className="" />
            ))}
          </Container.Flex>
        </Container.Columns>
      </Container>
      <Container
        className={{
          dimension: "mt-10 lg:mt-20 mr-2",
          otherStyles: "",
        }}
      >
        {groupArticles.map(({ category, posts }, index) => (
          <Container
            key={category}
            className={clsx(index === 0 ? "mt-3 mb-10" : "mt-5 mb-5")}
          >
            <TextLayout.Title
              as="h3"
              title={capitalize(category)}
              className="mb-5"
            />
            <Container
              className={{
                scrolling:
                  "snap-mandatory snap-x overflow-x-auto scrollbar-hide",
              }}
            >
              <Carousel articles={posts} blogPath />
            </Container>
          </Container>
        ))}
      </Container>
      <Container className=" absolute right-0 w-20 h-full bg-gradient-to-r to-gray-100 dark:from-gray-900/30 dark:to-gray-900/60 via-gray-900/50" />
    </Container.Columns>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const text = await getAllText();
  const articles = text.map(({ data }) => data);
  if (!articles.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { articles },
  };
};
