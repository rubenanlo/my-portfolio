import { capitalize } from "lodash";
import clsx from "clsx";
import { Container } from "components/Container";
import { Carousel } from "components/Articles";
import { TextLayout } from "components/TextLayout";
import { ArrowRightIcon } from "components/AppIcons";
import { TowardsDevIcon } from "components/SocialIcons";
import { MediumIcon } from "components/SocialIcons";
import { useAnimatedValue } from "helpers/useAnimatedValue";
import { useResponsive } from "helpers/useResponsive";
import { getAllText } from "helpers/getText";
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
      dimension: "mt-10 lg:mt-18 px-10 lg:px-16",
    }}
  >
    <TextLayout.Title as="h1" title="My blog" />
    <TextLayout.Paragraph
      as="h3"
      paragraph="A place where I share my thoughts related to web development, programming, and other topics."
      className="mt-5"
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
        grid: "grid-cols-1 lg:grid-cols-[1.5fr,2fr] items-start",
        dimension: "mt-5 lg:w-1/2 desktop-sm:w-full",
      }}
    >
      <TextLayout.Paragraph paragraph="and I talk about:" className="mt-2" />
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
      dimension:
        "mt-24 lg:mt-14 desktop-sm:mt-10 pl-16 desktop-sm:pl-10 max-h-none desktop-sm:max-h-[100vh] mr-[5px] desktop-sm:hover:mr-0",
      overflow: "overflow-y-hidden hover:overflow-y-auto scrollbar",
    }}
  >
    {groupArticles.map(({ category, posts }, index) => (
      <Container
        key={category}
        className={clsx(index === 0 ? "mt-3 mb-10" : "mt-5 mb-5")}
      >
        <Container.Flex
          className={{
            flex: "justify-start items-center",
            dimension: "pr-10",
          }}
        >
          <TextLayout.Title
            as="h3"
            title={capitalize(category)}
            className="mb-5"
          />
          {posts.length > 1 && !isLgScreen && (
            <ArrowRightIcon className="w-4 text-gray-400 -mt-3 ml-4" />
          )}
        </Container.Flex>
        <Container
          className={{
            scrolling: "snap-mandatory snap-x overflow-x-scroll scrollbar-hide",
          }}
        >
          <Carousel articles={posts} narrowWidth={isLgScreen ? false : true} />
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
        grid: "grid-cols-1 desktop-sm:grid-cols-[1fr,1.5fr] overflow-y-hidden",
        otherStyles: "overflow-x-hidden",
      }}
    >
      <BlogHeader animatedTotalPosts={animatedTotalPosts} tags={tags} />
      <Posts groupArticles={groupArticles} isLgScreen={isLgScreen} />
      {!isLgScreen && (
        <Container className=" absolute right-0 w-20 h-full bg-gradient-to-r from-gray-100/60 to-gray-100 dark:from-gray-900/10 dark:to-gray-900/90 dark:via-gray-900/70 rounded-tr-xl overflow-y-hidden" />
      )}
    </Container.Columns>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const text = await getAllText({ page: "blog" });
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
