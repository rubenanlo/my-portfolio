import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { Article } from "components/Articles";
import { socialInfo } from "library/socialInfo";
import { work } from "library/projects";

const ProjectHeader = () => {
  const [header] = work.filter(({ title }) => title);

  const techStackHeader = Object.keys(header.techStack);

  const [github] = socialInfo.social.filter(({ href }) =>
    href.includes("github")
  );

  return (
    <Container
      className={{
        dimension: "mt-10 lg:mt-18 px-10 lg:px-16",
      }}
    >
      <TextLayout.Title as="h1" title={header.title} />
      <TextLayout.Paragraph as="h3" paragraph={header.subtitle} />

      <Container
        className={{
          dimension: "w-1/5 my-7",
          border: "border-b border-zinc-600/50",
        }}
      />
      {techStackHeader.map((tech) => (
        <Container.Columns
          key={tech}
          className={{
            grid: "grid-cols-[1.5fr,2fr] items-start mb-2",
          }}
        >
          <TextLayout.Paragraph paragraph={tech} />
          <TextLayout.Paragraph
            paragraph={header.techStack[tech]}
            className={{
              parent: "w-full ",
            }}
          />
        </Container.Columns>
      ))}
      <Container
        className={{
          dimension: "w-1/5 my-7",
          boder: "border-b border-zinc-600/50",
        }}
      />
      <Container.Flex className={{ flex: "justify-start gap-x-2" }}>
        <TextLayout.Paragraph paragraph="Where all my contributions are" />
        <Container.Link
          href={github.href}
          target="_blank"
          Component={github.Social}
          className={{
            child:
              "fill-orange-primary dark:fill-orange-tertiary hover:fill-orange-tertiary dark:hover:fill-orange-primary",
          }}
        />
      </Container.Flex>
      <TextLayout.Paragraph paragraph="you can filter this list by" />
    </Container>
  );
};

const ProjectList = () => {
  const projects = work.filter(({ name }) => name);

  return (
    <Container
      className={{
        dimension:
          "max-h-none desktop-sm:max-h-[100vh] mr-[5px] desktop-sm:hover:mr-0",
        overflow: "overflow-y-hidden hover:overflow-y-auto scrollbar",
      }}
    >
      <Container.Columns
        className={{
          grid: "grid-cols-1 desktop-sm:grid-cols-2 gap-10",
          dimension: "pl-10 pr-20 mt-20",
          otherStyles: "overflow-x-hidden",
        }}
      >
        {projects.map((project) => (
          <Article key={project.name} narrowWidth article={project} />
        ))}
      </Container.Columns>
    </Container>
  );
};

const Projects = () => (
  <Container.Columns
    className={{
      position: "relative",
      grid: "grid-cols-1 desktop-sm:grid-cols-[1fr,1.5fr]",
      otherStyles: "overflow-x-hidden scrollbar",
    }}
  >
    <ProjectHeader />
    <ProjectList />
  </Container.Columns>
);

export default Projects;
