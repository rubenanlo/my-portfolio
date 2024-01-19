import Image from "next/image";
import dayjs from "dayjs";
import { Container } from "components/Container";
import Hero from "components/Hero";
import { Post } from "components/Post";
import { Button } from "components/Button";
import { Form } from "components/Form";
import Pagination from "components/Pagination";
import { TextLayout } from "components/TextLayout";
import { useResponsive } from "helpers/useResponsive";
import { usePagination } from "helpers/usePagination";
import { getAllText } from "helpers/getTextForSlug";
import resume from "library/resume";
import { BriefcaseIcon, ArrowDownIcon, MailIcon } from "components/AppIcons";

const Article = ({ article: { slug, title, date, description } }) => (
  <Container.Link href={`/blog/${slug}`}>
    <Post
      as="article"
      className={{
        dimension:
          "w-3/4 lg:w-full shrink-0 p-5 lg:p-0 overflow-x-visible lg:overflow-x-hidden",
        otherStyles: "snap-center",
      }}
    >
      <Post.Title title={title} />
      <Post.Eyebrow
        as="time"
        dateTime={date}
        decorate
        date={dayjs(date).format("MMMM D, YYYY")}
      />
      <Post.Description text={description} />
      <Post.Cta text="Read article" />
    </Post>
  </Container.Link>
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

const Carousel = ({ articles }) => (
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

// !Create backend for this section (modal confirming email and sending email)
const Contact = () => (
  <Form
    action="/thank-you"
    className={{
      border: "border border-zinc-100 p-6 dark:border-zinc-700/40",
      otherStyles: "rounded-2xl",
    }}
  >
    <TextLayout.Title
      as="h4"
      className="flex"
      AdditionalComponent={<MailIcon className="h-6 w-6 flex-none mr-3" />}
      title={"Let's connect"}
    />
    <TextLayout.Paragraph
      className={{ dimension: "mt-2", typography: "text-sm" }}
      paragraph="Get notified when I publish something new, and unsubscribe at any time."
    />
    <Container.Flex className="mt-6">
      <Form.Field
        variant="primary"
        field="email"
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        required
      />
      <Button
        variant="primary"
        type="submit"
        className="ml-4 flex-none"
        text="Join"
      />
    </Container.Flex>
  </Form>
);

const Role = ({ item: role }) => {
  return (
    <>
      <Container.Flex
        className={{
          position: "relative",
          flex: "shrink-0 flex-none items-center justify-center",
          dimension: "mt-1 h-10 w-10",
          background: "dark:bg-zinc-800",
          border: "dark:border dark:border-zinc-700/50",
          ring: "ring-1 ring-zinc-900/5 dark:ring-0",
          otherStyles: "rounded-full shadow-md shadow-zinc-800/5",
        }}
      >
        <Image
          src={role.logo}
          alt=""
          className="h-10 w-10 rounded-full"
          unoptimized
        />
      </Container.Flex>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400 w-[9.3rem]">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 self-start"
          aria-label={`${role.start} until ${role.end}`}
        >
          {`${role.start} - ${role.end}`}
        </dd>
      </dl>
    </>
  );
};

const Resume = () => (
  <Container className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
    <TextLayout.Title
      as="h4"
      className="flex"
      AdditionalComponent={<BriefcaseIcon className="h-6 w-6 flex-none mr-3" />}
      title="Work"
    />
    <Container.List
      list={resume}
      as={{
        parent: "ul",
        child: "li",
      }}
      className={{
        parent: {
          dimension: "mt-6 space-y-4",
        },
        child: {
          flex: "flex gap-4",
        },
      }}
      AdditionalComponent={Role}
      variant="array"
    />
    <Container.Link href="docs/resume.pdf" target="_blank">
      <Button
        variant="secondary"
        className={{ dimension: "mt-6 w-full", otherStyles: "group" }}
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </Container.Link>
  </Container>
);

const Index = ({ articles }) => {
  const isSmallScreen = useResponsive(1024);
  const ResponsiveComponent = isSmallScreen ? Carousel : ArticleList;

  return (
    <Container
      className={{ dimension: "max-w-xl lg:max-w-4xl w-full mx-auto" }}
    >
      <Hero />
      <Container.Section>
        <Container.Columns
          className={{
            grid: "grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-32",
          }}
        >
          <ResponsiveComponent articles={articles} />
          <Container className="place-items-start space-y-10">
            <Contact />
            <Resume />
          </Container>
        </Container.Columns>
      </Container.Section>
    </Container>
  );
};

export default Index;

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
