import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { capitalize } from "lodash";
import { Container, AnimatedContainer } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { getAllText } from "helpers/getText";
import { RUBEN_HEADSHOT as rubenHeadshot } from "helpers/exportImages";

const AboutHeader = ({ spotlight }) => {
  const titles = Object.keys(spotlight).filter((value) => value !== "slug");

  return (
    <Container
      className={{
        dimension: "mt-10 lg:mt-18 px-10 lg:pl-16 lg:pr-10 overflow-hidden",
      }}
    >
      <TextLayout.Title as="h1" title="About me" />
      <TextLayout.Paragraph
        as="h3"
        paragraph="A brief description of me and my professional journey"
        className="mt-5"
      />
      <Container
        className={{
          dimension: "w-1/5 my-6",
          border: "border-b border-zinc-600/50",
        }}
      />
      {titles.map((title) => (
        <Container.Columns
          key={title}
          className={{
            grid: "grid-cols-[1fr,2fr] items-start",
            dimension: "mb-2 lg:w-1/2 desktop-sm:w-full",
          }}
        >
          <TextLayout.Paragraph paragraph={title} />
          <TextLayout.Paragraph
            paragraph={capitalize(spotlight[title])}
            className={{
              dimension: "w-full",
            }}
          />{" "}
        </Container.Columns>
      ))}
      <Container
        className={{
          dimension: "w-1/5 my-6",
          border: "border-b border-zinc-600/50",
        }}
      />
      <AnimatedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="flex justify-center lg:justify-start"
      >
        <Container.Image
          src={rubenHeadshot}
          alt="about"
          className={{
            dimension: "w-52",
            otherStyles: "rounded-xl shadow-2xl shadow-black/60 m-5",
            opacity: "opacity-50",
          }}
        />
      </AnimatedContainer>
    </Container>
  );
};

// easy to understand and access as possible. to add what is the mitigation option catalogue in the homepage. To provide a bit more background, why? and what? wherever possible, it's always good to lead with verbs (Browse through the data to find this). Jake to send to a media library. Link to afolu sector and particularly in China. Pexels.

const AboutText = ({ text }) => (
  <Container
    className={{
      dimension:
        "max-h-none desktop-sm:max-h-[100vh] mr-[5px] desktop-sm:hover:mr-0 mt-10 pt-10",
      overflow: "overflow-y-hidden hover:overflow-y-auto scrollbar",
    }}
  >
    <Container
      className={{
        grid: "grid-cols-1 desktop-sm:grid-cols-2 gap-10",
        dimension: "px-10 desktop-sm:pl-10 desktop-sm:pr-20",
        mdx: "prose prose-lg prose-slate text-zinc-400 dark:prose-invert",
      }}
    >
      <MDXRemote {...text} />
    </Container>
  </Container>
);

const About = ({ spotlight, text }) => (
  <Container.Columns
    className={{
      position: "relative",
      grid: "grid-cols-1 desktop-sm:grid-cols-[1fr,1.5fr]",
      otherStyles: "overflow-x-hidden",
    }}
  >
    <AboutHeader spotlight={spotlight} />
    <AboutText text={text} />
  </Container.Columns>
);

export default About;

export const getStaticProps = async () => {
  const text = await getAllText({ page: "about", mdxContent: true });
  const [{ data: spotlight, content }] = text;
  const mdxSource = await serialize(content);

  return {
    props: {
      spotlight,
      text: mdxSource,
    },
  };
};
