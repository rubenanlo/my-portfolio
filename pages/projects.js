import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { capitalize } from "lodash";
import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { Article } from "components/Articles";
import { Button } from "components/Button";
import { useResponsive } from "helpers/useResponsive";
import { socialInfo } from "library/socialInfo";
import { work } from "library/projects";

const ProjectHeader = ({ filter, setFilter, filters, summary, t }) => {
  const techStackHeader = Object.keys(summary.techStack);

  const [github] = socialInfo().social.filter(({ href }) =>
    href.includes("github")
  );

  return (
    <Container
      className={{
        dimension: "mt-10 lg:mt-18 px-10 lg:pl-16 lg:pr-0",
      }}
    >
      <TextLayout.Title as="h1" title={summary.title} />
      <TextLayout.Paragraph
        as="h3"
        paragraph={summary.subtitle}
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
            grid: "grid-cols-[1fr,2fr] items-start gap-x-2",
            dimension: "mb-2 lg:w-1/2 desktop-sm:w-full",
          }}
        >
          <TextLayout.Paragraph paragraph={t(`techStack.${tech}`)} />
          <TextLayout.Paragraph
            paragraph={summary.techStack[tech]}
            className={{
              dimension: "w-full",
            }}
          />
        </Container.Columns>
      ))}
      <Container
        className={{
          dimension: "w-1/5 my-5",
          border: "border-b border-zinc-600/50",
        }}
      />
      <Container.Flex className={{ flex: "justify-start gap-x-2" }}>
        <TextLayout.Paragraph paragraph={t("toGithub")} />
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
        className={{ dimension: "mt-3", flex: "justify-start gap-x-3" }}
      >
        {filters.map((filterItem) => (
          <Button
            key={filterItem}
            variant={t(filterItem) === t(filter) ? "selected" : "secondary"}
            onClick={() => setFilter(t(filterItem))}
          >
            <TextLayout.Paragraph paragraph={capitalize(filterItem)} />
          </Button>
        ))}
      </Container.Flex>
    </Container>
  );
};

const ProjectList = ({ projects }) => {
  const isLgScreen = useResponsive(1027);

  return (
    <Container
      className={{
        dimension: "max-h-none desktop-sm:max-h-[100vh] mt-10 pt-10",
        overflow: "overflow-hidden hover:overflow-y-auto scrollbar",
      }}
    >
      <Container.Columns
        className={{
          grid: "grid-cols-1 desktop-sm:grid-cols-2 gap-10",
          dimension:
            "px-10 desktop-sm:pl-10 desktop-sm:pr-20 desktop-sm:w-[685px]",
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
  const isSmallScreen = useResponsive(1251);
  const { locale } = useRouter();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setFilter(t("filters.all"));
    //eslint-disable-next-line
  }, [locale]);

  const { t } = useTranslation("projects");
  const workArr = work(t);
  const summary = workArr[0];
  const projects = workArr.filter(({ name, category }) =>
    filter === t("filters.all")
      ? name
      : name && t(`filters.${category}`) === filter
  );
  const filters = [
    t("filters.all"),
    ...Array.from(
      new Set(
        workArr
          .filter(({ category }) => category)
          .map(({ category }) => t(`filters.${category}`))
      )
    ),
  ];

  return (
    <Container.Columns
      className={{
        position: "relative",
        grid: "grid-cols-1 desktop-sm:grid-cols-[1fr,1.5fr]",
        otherStyles: "overflow-x-hidden",
      }}
    >
      <ProjectHeader
        filter={filter}
        setFilter={setFilter}
        summary={summary}
        t={t}
        filters={filters}
      />
      {isSmallScreen && (
        <Container
          className={{
            dimension: "w-full mt-14",
            border: "border-b border-zinc-600/50",
          }}
        />
      )}
      <ProjectList projects={projects} />
    </Container.Columns>
  );
};

export default Projects;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "navLinks",
        "projects",
      ])),
    },
  };
};
