import Image from "next/image";
import dayjs from "dayjs";
import { Container } from "components/Container";
import Hero from "components/Hero";
import { Post } from "components/Post";
import { Button } from "components/Button";
import Pagination from "components/Pagination";
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
];

const Article = ({ article, className }) => (
  <Post as="article" className={className}>
    <Post.Title href={`/articles/${article.slug}`}>{article.title}</Post.Title>
    <Post.Eyebrow as="time" dateTime={article.date} decorate>
      {dayjs(article.date).format("MMMM D, YYYY")}
    </Post.Eyebrow>
    <Post.Description>{article.description}</Post.Description>
    <Post.Cta>Read article</Post.Cta>
  </Post>
);

const ArticleList = ({ articles }) => {
  const { currentPosts, ...pagination } = usePagination({
    initialNumberOfPages: 1,
    itemsPerPage: 3,
    items: articles,
  });

  return (
    <Container.Flex column className="px-2" justify="justify-between">
      <Container.Flex column className="gap-16 h-full">
        {currentPosts.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </Container.Flex>
      <Pagination pagination={pagination} />
    </Container.Flex>
  );
};

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

const Newsletter = () => (
  <form
    action="/thank-you"
    className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
  >
    <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      <MailIcon className="h-6 w-6 flex-none" />
      <span className="ml-3">Stay up to date</span>
    </h2>
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>
    <div className="mt-6 flex">
      <input
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        required
        className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
      />
      <Button type="submit" className="ml-4 flex-none">
        Join
      </Button>
    </div>
  </form>
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

const Role = ({ role }) => {
  let startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  let startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  let endLabel = typeof role.end === "string" ? role.end : role.end.label;
  let endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 shrink-0 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={role.logo}
          alt=""
          className="h-10 w-10 rounded-full"
          unoptimized
        />
      </div>
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
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
};

function Resume() {
  let resume = [
    {
      company: "UNSDSN",
      title: "Fullstack Web Developer",
      logo: sdsnLogo,
      start: "2022",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
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

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

const Carousel = ({ articles }) => (
  <Container.Flex
    className="snap-mandatory snap-x max-w-sm overflow-x-auto"
    gapX="gap-x-20"
  >
    {articles.map((article) => (
      <Article
        key={article.slug}
        article={article}
        className="snap-center w-full shrink-0"
      />
    ))}
  </Container.Flex>
);

const Index = () => {
  const isSmallScreen = useResponsive(1024);
  const ResponsiveComponent = isSmallScreen ? Carousel : ArticleList;

  return (
    <>
      <Hero />
      <Container.Section className="lg:pb-32">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <ResponsiveComponent articles={articles} />
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container.Section>
    </>
  );
};

export default Index;
