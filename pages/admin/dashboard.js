import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import clsx from "clsx";
import { Container } from "components/ui/Container";
import { Show } from "components/ui/Show";
import { Card } from "components/ui/Card";
import { TextLayout } from "components/ui/TextLayout";
import ShowTruncated from "components/modals/ShowTruncated";
import { setTruncatedText } from "helpers/manipulateText";
import { useModalTooltip } from "helpers/useModalTooltip";
import { useResponsive } from "helpers/useResponsive";
import { zoomIn, popUp } from "library/animations";
import { cards } from "library/dashboard";

const Circle = ({
  image,
  isHovered,
  isIndex,
  index,
  isSmallScreen,
  isCardBigger,
}) => {
  const trigger = isHovered && isIndex === index;

  return (
    <motion.div
      animate={{
        width: trigger ? "100%" : "12.5%",
        height: trigger
          ? "100%"
          : isCardBigger(index, isSmallScreen)
          ? "7.5%"
          : "15%",
        borderRadius: trigger ? "0%" : "100%",
        scale: trigger && isCardBigger(index) ? 2.4 : 1,
        opacity: trigger ? 0.2 : 1,
        top: trigger ? "0rem" : "2.5rem",
        left: trigger ? "0rem" : "1.3rem",
        transition: {
          duration: 0.3,
        },
      }}
      className="absolute shrink-0 overflow-hidden"
    >
      <Container.Image
        original={image}
        alt="dashboard-item"
        className="shrink-0 opacity-80"
      />
    </motion.div>
  );
};

const Dashboard = () => {
  const isSmallScreen = useResponsive(1024);

  //TODO: fix the modal tooltip
  // For the modal tooltip to show full text
  const {
    fullText,
    modalVisibility,
    mousePosition,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useModalTooltip();

  // To control the behavior of the images when hovering over a card
  const [isHovered, setIsHovered] = useState(false);
  const [isIndex, setIndex] = useState("");

  // Function to determine if a card should be bigger in the bento box layout
  const isCardBigger = (index, isSmallScreen) => {
    if (isSmallScreen) return false;
    return index % 2 === 0;
  };

  // For the layout of the cards depending on screen size
  const ResponsiveComponent = isSmallScreen
    ? Container.Flex
    : Container.Columns;

  // For the bg color of the card depending on theme
  const { resolvedTheme } = useTheme();
  const bgColor = resolvedTheme === "dark" ? "#010101" : "#E2E8F0";

  const { isReady } = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isReady) setIsLoaded(true);
  }, [isReady]);

  return (
    <Container.Section className="w-auto">
      <ResponsiveComponent
        className={clsx(
          isSmallScreen ? "flex-col" : "grid-cols-3 content-start",
          "w-full lg:mt-24 lg:h-auto gap-2 justify-items-center"
        )}
      >
        {cards.map(
          ({ name, isHeader, href, description, tag, title, image }, index) => (
            <Show key={name} ternary>
              <Show.When isTrue={isHeader}>
                <Container
                  className={{
                    position: clsx(
                      isSmallScreen ? "" : "ml-2",
                      "mb-14 lg:mb-0"
                    ),
                    dimension: clsx(isSmallScreen ? "text-center" : "w-full"),
                  }}
                >
                  <TextLayout.Title as="h1" title={title} />
                  <TextLayout.Subtitle key={title} subtitle={title} />
                </Container>
              </Show.When>
              <Show.Else>
                <Card
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setIndex(index);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  variant="primary"
                  animate={!isSmallScreen && { ...zoomIn(bgColor), ...popUp }}
                  className={{
                    position: "relative",
                    dimension: clsx(
                      isCardBigger(index) ? "row-span-2" : "",
                      "p-5 h-full w-full"
                    ),
                    rounded: "rounded-sm",
                    other: "cursor-pointer overflow-hidden",
                  }}
                >
                  <Container.Link href={href}>
                    {isLoaded && (
                      <Circle
                        image={image}
                        isHovered={isHovered}
                        isIndex={isIndex}
                        index={index}
                        isSmallScreen={isSmallScreen}
                        isCardBigger={isCardBigger}
                      />
                    )}
                    <Container.Flex
                      className={{
                        dimension: "h-full",
                        position: "ml-8",
                        flex: "items-start gap-x-5",
                      }}
                    >
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
                              : setTruncatedText(
                                  description,
                                  isSmallScreen ? 50 : 30
                                )
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
              </Show.Else>
            </Show>
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
