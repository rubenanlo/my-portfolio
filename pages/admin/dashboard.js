import { truncate } from "lodash";
import clsx from "clsx";
import { Container } from "components/Container";
import { AnimatedCard } from "components/Card";
import { TextLayout } from "components/TextLayout";
import ShowTruncated from "components/modals/ShowTruncated";
import { useModalTooltip } from "helpers/useModalTooltip";
import { useResponsive } from "helpers/useResponsive";
import { zoomIn, popUp } from "library/animations";

const cards = [
  {
    name: "Blog post",
    href: "/admin/blog",
    description: "Create, edit and delete blog posts",
    color: "bg-green-700 dark:bg-orange-tertiary",
    tag: "Reading",
  },
  {
    name: "My CV",
    href: "/admin/cv",
    description: "Create, edit, and delete CV entries",
    color: "bg-green-600 dark:bg-orange-quaternary",
    tag: "JobHunt",
  },
];

const Circle = ({ name, className }) => {
  // Find the card with the matching name
  const card = cards.find((card) => card.name === name);
  // If a card is found, use its color; otherwise, provide a default color
  const color = card ? card.color : "bg-gray-200";

  return (
    <div className={clsx(className, color, "rounded-full h-4 w-4 mt-2")} />
  );
};

const Dashboard = () => {
  const isSmallScreen = useResponsive(1024);
  const {
    modalVisibility,
    mousePosition,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useModalTooltip();

  const maxCharacters = isSmallScreen ? 50 : 30;
  const setTruncatedText = (text) =>
    truncate(text, {
      length: maxCharacters,
      separator: " ",
    });

  const ResponsiveComponent = isSmallScreen
    ? Container.Flex
    : Container.Columns;

  return (
    <Container.Section fullScreen className="w-full">
      <ResponsiveComponent
        column
        className="w-full mt-24 h-full"
        columns="grid-cols-1 lg:grid-cols-3"
        content="content-start"
        justify="justify-items-center"
      >
        {cards.map(({ name, href, description, tag }) => (
          <>
            <AnimatedCard
              key={name}
              animate={{ ...zoomIn, ...popUp }}
              className="cursor-pointer"
              dimensions="h-52 w-full lg:w-52"
            >
              <Container.Link href={href}>
                <Container.Flex
                  items="items-start"
                  gapX="gap-x-5"
                  className="h-full"
                >
                  <Circle name={name} className="shrink-0" />
                  <Container.Flex column justify="justify-between h-40">
                    <TextLayout.Subtitle
                      subtitle={name}
                      className="text-zinc-500 text-xl"
                    />
                    <TextLayout.Paragraph
                      paragraph={setTruncatedText(description)}
                      className="border-l-4 border-gray-400/50 pl-3 text-sm dark:border-gray-400 mt-3, z-50"
                      onMouseEnter={(e) => {
                        handleMouseEnter(
                          description,
                          setTruncatedText(description),
                          e
                        );
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                    <TextLayout.Tag tag={tag} />
                  </Container.Flex>
                </Container.Flex>
              </Container.Link>
            </AnimatedCard>
            <ShowTruncated
              value={description.length > maxCharacters && description}
              isVisible={modalVisibility}
              mousePosition={mousePosition}
            />
          </>
        ))}
      </ResponsiveComponent>
    </Container.Section>
  );
};

export default Dashboard;
