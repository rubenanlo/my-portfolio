import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Header } from "components/Header";
import Footer from "components/Footer";
import { Container } from "components/ui/Container";
import Navbar from "components/Navbar";
// import AmbientCanvasBackground from "components/AmbientBackground";
import { useResponsive } from "helpers/useResponsive";

const WaterMark = () => (
  <Container
    className={{
      position:
        "fixed left-[calc(50%-4rem)] sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)] top-10",
      otherStyles: "overflow-x-hidden transform-gpu blur-3xl",
    }}
    aria-hidden="true"
  >
    <Container
      className={{
        dimension: "aspect-[1108/632] w-[69.25rem]",
        background: "bg-gradient-to-r from-[#fafbfb] to-[#000000]",
        otherStyles: "opacity-30",
      }}
      style={{
        clipPath:
          "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
      }}
    />
  </Container>
);

export const AppLayout = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const { asPath } = useRouter();
  const isSmallerScreen = useResponsive(1024);

  // Paths that don't have a footer, blended navbar or twirl
  const noFooterPaths = ["/admin"];
  const noBlendedNavbarPaths = ["/", "/#", "/admin"];
  // const twirlPaths = ["/", "/#"];
  const maxHeightPaths = ["/projects", "/blog", "/about"];
  const hasFooter = noFooterPaths.some((path) => asPath !== path);
  const hasBlendedNavbar = !noBlendedNavbarPaths.includes(asPath);
  // const hasTwirlPaths = twirlPaths.includes(asPath);
  const hasMaxHeight = maxHeightPaths.includes(asPath);

  return (
    <>
      {/* {hasTwirlPaths && resolvedTheme === "dark" && <AmbientCanvasBackground />} */}
      <Container
        className={{
          position: "relative",
          dimension: "min-h-screen",
          overflow: "overflow-x-hidden",
          otherStyles: "antialiased",
        }}
      >
        <Container
          className={{
            position: "mx-auto",
            dimension: "max-w-sm lg:max-w-4xl desktop-sm:max-w-6xl",
            typography: "font-lato text-gray-200 ",
          }}
        >
          {resolvedTheme === "dark" && <WaterMark />}
          {hasBlendedNavbar && <Navbar type="blended" />}

          <Header />
          {isSmallerScreen && <Navbar type="list" />}
          <Container.Flex
            className={{
              flex: "flex-col justify-between",
              dimension: clsx(
                hasMaxHeight ? "desktop-sm:max-h-[90vh]" : "",
                "min-h-[90vh] mt-[10vh] rounded-t-2xl"
              ),
              background:
                "bg-gray-100 dark:bg-gray-900/50 border-t border-r border-l border-zinc-100/20",
            }}
          >
            {children}
            {hasFooter && <Footer />}
          </Container.Flex>
        </Container>
      </Container>
    </>
  );
};
