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
import {
  EY_LOGO as eyLogo,
  DELOITTE_LOGO as deloitteLogo,
  LOGO_LINKEDIN_1 as rawDevLogo,
  PWC_LOGO as pwcLogo,
  UNSDSN_LOGO as sdsnLogo,
  BAKER_MCKENZIE_LOGO as bakerLogo,
} from "helpers/exportImages";

const articles = [
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
  {
    title: "How to use Tailwind CSS with Next.js",
    description: "A step-by-step guide to setting up Tailwind CSS with Next.js",
    slug: "how-to-use-tailwind-css-with-next-js",
    date: "2021/03/16",
    readingTime: 5,
  },
];

let resume = [
  {
    company: "UNSDSN",
    title: "Fullstack Web Developer",
    logo: sdsnLogo,
    start: "2022",
    end: "Present",
  },
  {
    company: "rawDev",
    title: "Fullstack Web Developer",
    logo: rawDevLogo,
    start: "2022",
    end: "Present",
  },
  {
    company: "Baker McKenzie",
    title: "Economist, Data visualizations",
    logo: bakerLogo,
    start: "2021",
    end: "2022",
  },
  {
    company: "PWC",
    title: "Economist, Data visualizations",
    logo: pwcLogo,
    start: "2019",
    end: "2021",
  },
  {
    company: "EY",
    title: "Economist, Data visualizations",
    logo: eyLogo,
    start: "2011",
    end: "2019",
  },
  {
    company: "Deloitte",
    title: "Economist, Data visualizations",
    logo: deloitteLogo,
    start: "2008",
    end: "2010",
  },
];

const Article = ({ article }) => (
  <Post
    as="article"
    className={{
      dimension:
        "w-3/4 lg:w-full shrink-0 p-5 lg:p-0 overflow-x-visible lg:overflow-x-hidden",
      otherStyles: "snap-center",
    }}
  >
    <Post.Title href={`/articles/${article.slug}`} title={article.title} />
    <Post.Eyebrow
      as="time"
      dateTime={article.date}
      decorate
      date={dayjs(article.date).format("MMMM D, YYYY")}
    />
    <Post.Description text={article.description} />
    <Post.Cta text="Read article" />
  </Post>
);

const ArticleList = ({ articles }) => {
  const { currentPosts, ...pagination } = usePagination({
    initialNumberOfPages: 1,
    itemsPerPage: 4,
    items: articles,
  });

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
      <Pagination pagination={pagination} />
    </Container.Flex>
  );
};

const Carousel = ({ articles }) => (
  <Container.Flex
    className={{
      flex: "gap-x-5",
      dimension: "max-w-sm",
      otherStyles: "snap-mandatory snap-x overflow-x-auto scrollbar pb-2",
    }}
  >
    {articles.map((article) => (
      <Article key={article.slug} article={article} />
    ))}
  </Container.Flex>
);

const MailIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
      className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
    />
    <path
      d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
      className="stroke-zinc-400 dark:stroke-zinc-500"
    />
  </svg>
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

const BriefcaseIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
      className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
    />
    <path
      d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
      className="stroke-zinc-400 dark:stroke-zinc-500"
    />
  </svg>
);

const ArrowDownIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
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
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${role.start} until ${role.end}`}
        >
          {`${role.start} - ${role.end}`}
        </dd>
      </dl>
    </>
  );
};

const Resume = () => (
  <Container className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
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
    <Button
      href="#"
      variant="secondary"
      className={{ dimension: "mt-6 w-full", otherStyles: "group" }}
    >
      Download CV
      <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
    </Button>
  </Container>
);

const Index = () => {
  const isSmallScreen = useResponsive(1024);
  const ResponsiveComponent = isSmallScreen ? Carousel : ArticleList;

  return (
    <>
      <Hero />
      <Container.Section>
        <Container.Columns
          className={{
            position: "mx-auto",
            grid: "grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-32",
            dimension: "max-w-xl lg:max-w-4xl w-full",
          }}
        >
          <ResponsiveComponent articles={articles} />
          <Container className="place-items-start space-y-10">
            <Contact />
            <Resume />
          </Container>
        </Container.Columns>
      </Container.Section>
    </>
  );
};

export default Index;
