import { useState } from "react";
import { capitalize } from "lodash";
import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { Article } from "components/Articles";
import { Button } from "components/Button";
import { useResponsive } from "helpers/useResponsive";
import { socialInfo } from "library/socialInfo";
import { work } from "library/projects";

const ProjectHeader = ({ filter, setFilter }) => {
  const [header] = work.filter(({ title }) => title);

  const techStackHeader = Object.keys(header.techStack);

  const [github] = socialInfo.social.filter(({ href }) =>
    href.includes("github")
  );

  const filters = [
    "All",
    ...Array.from(
      new Set(
        work.map(({ category }) => category).filter((category) => category)
      )
    ),
  ];

  return (
    <Container
      className={{
        dimension: "mt-10 lg:mt-18 px-10 lg:pl-16 lg:pr-10",
      }}
    >
      <TextLayout.Title as="h1" title={header.title} />
      <TextLayout.Paragraph
        as="h3"
        paragraph={header.subtitle}
        className="mt-5"
      />

      <Container
        className={{
          dimension: "w-1/5 my-6",
          border: "border-b border-zinc-600/50",
        }}
      />
      {techStackHeader.map((tech) => (
        <Container.Columns
          key={tech}
          className={{
            grid: "grid-cols-[1fr,2fr] items-start",
            dimension: "mb-2 lg:w-1/2 desktop-sm:w-full",
          }}
        >
          <TextLayout.Paragraph paragraph={tech} />
          <TextLayout.Paragraph
            paragraph={header.techStack[tech]}
            className={{
              dimension: "w-full",
            }}
          />
        </Container.Columns>
      ))}
      <Container
        className={{
          dimension: "w-1/5 my-6",
          border: "border-b border-zinc-600/50",
        }}
      />
      <Container.Flex className={{ flex: "justify-start gap-x-2" }}>
        <TextLayout.Paragraph paragraph="Browse all my contributions here" />
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
      <Container.Flex
        className={{ dimension: "mt-10", flex: "justify-start gap-x-3" }}
      >
        {filters.map((filterItem) => (
          <Button
            key={filterItem}
            variant={filterItem === filter ? "selected" : "secondary"}
            onClick={() => setFilter(filterItem)}
          >
            <TextLayout.Paragraph paragraph={capitalize(filterItem)} />
          </Button>
        ))}
      </Container.Flex>
    </Container>
  );
};

const ProjectList = ({ filter }) => {
  const projects = work.filter(({ name, category }) =>
    filter === "All" ? name : name && category === filter
  );

  const isLgScreen = useResponsive(1027);

  return (
    <Container
      className={{
        dimension:
          "max-h-none desktop-sm:max-h-[100vh] mr-[5px] desktop-sm:hover:mr-0 mt-10 pt-10",
        overflow: "overflow-y-hidden hover:overflow-y-auto scrollbar",
      }}
    >
      <Container.Columns
        className={{
          grid: "grid-cols-1 desktop-sm:grid-cols-2 gap-10",
          dimension: "px-10 desktop-sm:pl-10 desktop-sm:pr-20",
          otherStyles: "overflow-x-hidden",
        }}
      >
        {projects.map((project) => (
          <Article
            key={project.name}
            narrowWidth
            fullWidth={isLgScreen}
            article={project}
          />
        ))}
      </Container.Columns>
    </Container>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");

  return (
    <Container.Columns
      className={{
        position: "relative",
        grid: "grid-cols-1 desktop-sm:grid-cols-[1fr,1.5fr]",
        otherStyles: "overflow-x-hidden",
      }}
    >
      <ProjectHeader filter={filter} setFilter={setFilter} />
      <ProjectList filter={filter} />
    </Container.Columns>
  );
};

export default Projects;
