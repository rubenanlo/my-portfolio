import { useTheme } from "next-themes";
import { truncate } from "lodash";
import clsx from "clsx";
import { Container } from "components/Container";
import { Card } from "components/Card";
import { TextLayout } from "components/TextLayout";
import ShowTruncated from "components/modals/ShowTruncated";
import { useModalTooltip } from "helpers/useModalTooltip";
import { useResponsive } from "helpers/useResponsive";
import { SPOTIFY as spotify } from "helpers/exportImages";
import { zoomIn, popUp } from "library/animations";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const cards = [
  {
    title: "Dashboard",
    subtitle: "Select which feature you want to use",
  },
  {
    name: "My music",
    href: "/admin/music",
    description: "Access your music player",
    color: "bg-green-700 dark:bg-green-700",
    tag: "Music",
    image: spotify,
  },
  {
    name: "Blog post",
    href: "/admin/cms",
    description: "Create, edit and delete blog posts",
    color: "bg-green-700 dark:bg-orange-tertiary",
    tag: "Reading",
    image: spotify,
  },
  {
    name: "My CV",
    href: "/admin/cv",
    description: "Create, edit, and delete CV entries",
    color: "bg-green-600 dark:bg-orange-quaternary",
    tag: "JobHunt",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned, Stay tuned, Stay tuned, Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
  },
  {
    name: "Future feature",
    href: "#",
    description: "Stay tuned",
    color: "bg-green-600 dark:bg-green-primary",
    tag: "StayTuned",
    image: spotify,
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
    fullText,
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

  const { resolvedTheme } = useTheme();
  const bgColor = resolvedTheme === "dark" ? "#010101" : "#E2E8F0";

  return (
    <Container.Section className="w-auto">
      <ResponsiveComponent
        className={clsx(
          isSmallScreen ? "flex-col" : "grid-cols-3 content-start",
          "w-full lg:mt-24 lg:h-auto gap-2 justify-items-center"
        )}
      >
        {cards.map(({ name, href, description, tag, title, image }, index) =>
          title ? (
            <Container key={title} className={{ dimension: "mb-14 lg:mb-0" }}>
              <TextLayout.Title as="h1" title={title} />
              <TextLayout.Subtitle key={title} subtitle={title} />
            </Container>
          ) : (
            <>
              <Card
                key={name}
                variant="primary"
                image={image}
                animate={!isSmallScreen && { ...zoomIn(bgColor), ...popUp }}
                className={{
                  position: "relative",
                  dimension: clsx(
                    index % 3 === 0 ? "row-span-2" : "",
                    "p-5 h-full w-full"
                  ),
                  rounded: "rounded-sm",
                }}
              >
                <Container.Link href={href}>
                  <Container.Image
                    src={image}
                    className="top-0 left-0 absolute h-full object-cover opacity-20"
                  />
                  <Container.Flex
                    className={{
                      dimension: "h-full",
                      flex: "items-start gap-x-5",
                    }}
                  >
                    <Circle name={name} className="shrink-0" />
                    <Container.Flex
                      className={{
                        dimension: "h-40",
                        flex: "flex-col justify-between",
                      }}
                    >
                      <TextLayout.Subtitle
                        subtitle={name}
                        className="text-zinc-500 text-xl"
                      />
                      <TextLayout.Paragraph
                        paragraph={
                          index % 2
                            ? description
                            : setTruncatedText(description)
                        }
                        className=" text-sm mt-3"
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
              </Card>
              <ShowTruncated
                value={fullText}
                isVisible={modalVisibility}
                mousePosition={mousePosition}
              />
            </>
          )
        )}
      </ResponsiveComponent>
    </Container.Section>
  );
};

export default Dashboard;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navLinks"])),
    },
  };
};
