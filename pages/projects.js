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
        dimension: "mt-10 lg:mt-20 px-10 lg:px-16",
      }}
    >
      <TextLayout.Title as="h1" title={header.title} />
      <TextLayout.Paragraph as="h3" paragraph={header.subtitle} />

      <Container className="border-b border-zinc-600/50 w-1/5 my-7" />
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
      <Container className="border-b border-zinc-600/50 w-1/5 my-7" />
      <Container.Flex className={{ flex: "justify-start gap-x-2" }}>
        <TextLayout.Paragraph paragraph="Where all my work is" />
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
    </Container>
  );
};

const ProjectList = () => {
  const projects = work.filter(({ name }) => name);

  return (
    <Container.Columns
      className={{ grid: "grid-cols-2 gap-10 pr-20 mt-20 overflow-y-auto" }}
    >
      {projects.map((project) => (
        <div key={project.name} className="border">
          <div />
          <Article article={project} />
        </div>
      ))}
    </Container.Columns>
  );
};

const Projects = () => {
  return (
    <Container.Columns
      className={{
        position: "relative",
        grid: "grid-cols-1 lg:grid-cols-[1fr,1.5fr]",
        dimension: "h-full",
        otherStyles: "overflow-x-hidden",
      }}
    >
      <ProjectHeader />
      <ProjectList />
    </Container.Columns>
  );
};

export default Projects;
