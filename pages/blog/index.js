import { capitalize } from "lodash";
import clsx from "clsx";
import { Container } from "components/Container";
import { getAllText } from "helpers/getTextForSlug";
import { Carousel } from "components/Posts";
import { TextLayout } from "components/TextLayout";
import { ArrowRightIcon } from "components/AppIcons";
import { TowardsDevIcon } from "components/SocialIcons";
import { MediumIcon } from "components/SocialIcons";
import { useAnimatedValue } from "helpers/useAnimatedValue";
import { useResponsive } from "helpers/useResponsive";
import { blurAnimation } from "library/animations";

const blogIcons = [
  {
    title: "Towards Dev",
    Component: TowardsDevIcon,
    href: "https://towardsdev.com/",
  },
  {
    title: "Medium",
    Component: MediumIcon,
    href: "https://medium.com/@rubenanlo",
  },
];

const BlogHeader = ({ animatedTotalPosts, tags }) => (
  <Container
    className={{
      dimension: "mt-10 lg:mt-20 px-10 lg:px-16",
    }}
  >
    <TextLayout.Title as="h1" title="My blog" />
    <TextLayout.Paragraph
      as="h3"
      paragraph="A place where I share my thoughts related to web development, programming, and other topics."
    />
    <Container.Flex
      className={{
        flex: "justify-start items-end gap-x-2 mt-5",
      }}
    >
      <TextLayout.Number animations={blurAnimation} className="text-7xl">
        {animatedTotalPosts}
      </TextLayout.Number>
      <TextLayout.Paragraph paragraph="published blog posts" className="" />
    </Container.Flex>

    <Container className="border-b border-zinc-600/50 w-1/5 my-7" />
    <Container.Flex
      className={{
        flex: "items-center justify-start gap-x-5",
      }}
    >
      <TextLayout.Paragraph paragraph="I am a writer at" />
      {blogIcons.map(({ title, Component, href }) => (
        <Container.Link
          key={title}
          href={href}
          target="_blank"
          Component={Component}
          className={{
            parent: "w-9 h-9 inline-flex items-center rounded-md",
          }}
        />
      ))}
    </Container.Flex>
    <Container.Columns
      className={{
        grid: "grid-cols-1 lg:grid-cols-[1.5fr,2fr] items-center mt-5",
      }}
    >
      <TextLayout.Paragraph paragraph="and I talk about:" />
      <Container.Flex
        className={{ flex: "justify-start gap-5 flex-wrap mt-2" }}
      >
        {tags.map((tag) => (
          <TextLayout.Tag key={tag} tag={tag} className="" />
        ))}
      </Container.Flex>
    </Container.Columns>
  </Container>
);

const Posts = ({ groupArticles, isLgScreen }) => (
  <Container
    className={{
      dimension: "mt-24 lg:mt-20 mr-2 pl-10",
      otherStyles: "",
    }}
  >
    {groupArticles.map(({ category, posts }, index) => (
      <Container
        key={category}
        className={clsx(index === 0 ? "mt-3 mb-10" : "mt-5 mb-5")}
      >
        <Container.Flex
          className={{
            flex: "justify-between items-center",
            dimension: "pr-10",
          }}
        >
          <TextLayout.Title
            as="h3"
            title={capitalize(category)}
            className="mb-5"
          />
          {posts.length > 1 && !isLgScreen && (
            <ArrowRightIcon className="w-4 text-gray-400 -mt-4 ml-4" />
          )}
        </Container.Flex>

        <Container
          className={{
            scrolling: "snap-mandatory snap-x overflow-x-scroll scrollbar-hide",
          }}
        >
          <Carousel articles={posts} blogPath={isLgScreen ? false : true} />
        </Container>
      </Container>
    ))}
  </Container>
);

const Blog = ({ articles }) => {
  const isLgScreen = useResponsive(1027);

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
      <BlogHeader animatedTotalPosts={animatedTotalPosts} tags={tags} />
      <Posts groupArticles={groupArticles} isLgScreen={isLgScreen} />
      {!isLgScreen && (
        <Container className=" absolute right-0 w-20 h-full bg-gradient-to-r from-gray-100/60 to-gray-100 dark:from-gray-900/10 dark:to-gray-900/90 dark:via-gray-900/70 rounded-tr-xl" />
      )}
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
