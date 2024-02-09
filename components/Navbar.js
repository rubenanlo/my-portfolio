import { useRef, useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { Post } from "components/Post";
import { Card } from "components/Card";
import { Button } from "components/Button";
import { Burger } from "library/appIcons";
import { Container, AnimatedContainer } from "components/Container";
import { useResponsive } from "helpers/useResponsive";
import { handleOutsideClick } from "helpers/handleOutsideClick";
import { LOGO_LINKEDIN_1 as rawDevLogo } from "helpers/exportImages";
import { navLinks } from "library/navlinks";
import { zoomIn, popUp } from "library/animations";

const ArrowDiagonal = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
  </svg>
);

const NavbarGridItem = ({ navLink }) => {
  const { resolvedTheme } = useTheme();
  const bgColor = resolvedTheme === "dark" ? "#010101" : "#E2E8F0";
  return (
    <Card
      variant="secondary"
      animate={{ ...zoomIn(bgColor), ...popUp }}
      className={{
        dimension: "h-auto w-full",
        otherStyles: "cursor-pointer opacity-60 rounded-md",
      }}
    >
      <Container.Link href={navLink.href} className="focus:outline-none">
        <Container className="group relative">
          <Post.Icon
            className={{
              parent: "inline-flex rounded-lg",
              child: {
                dimension: "h-6 w-6",
                typography: "group-hover:text-orange-primary ",
              },
            }}
            Icon={navLink.icon}
            aria-hidden="true"
          />
          <Post.Icon
            className={{
              parent: {
                position: "absolute right-0 top-0",
                typography: "group-hover:text-semibold",
                otherStyles: "pointer-events-none ",
              },
              child: "h-4 w-4",
            }}
            Icon={ArrowDiagonal}
            aria-hidden="true"
          />
          <Card.Header
            as="h3"
            className="mt-8 text-base text-zinc-600 dark:text-zinc-100  group-hover:text-semibold"
            title={navLink.name}
          />
        </Container>
      </Container.Link>
    </Card>
  );
};

const NavbarGrid = ({ navLinks }) => {
  const updatedNavLinks = navLinks.filter((navLink) => !navLink.onlyMobile);
  return (
    <Container
      as="nav"
      className={{ position: "relative", dimension: "w-full scale-90" }}
    >
      <Container.Columns
        className={{ dimension: "w-full", grid: "grid-cols-2 gap-x-10" }}
      >
        {updatedNavLinks.map((navLink) => (
          <NavbarGridItem key={navLink.name} navLink={navLink} />
        ))}
      </Container.Columns>
    </Container>
  );
};

NavbarGrid.displayName = "NavbarGrid";

const NavbarListModal = forwardRef(({ isVisible, navLinks }, ref) => {
  const [isIndex, setIndex] = useState(null);
  if (!isVisible) return null;

  return (
    <Container
      className={{
        position: "fixed top-0 left-0",
        dimension: "h-screen w-screen",
        background: "bg-zinc-800/70",
      }}
    >
      <AnimatedContainer
        animate={{ opacity: [0, 1], y: [200, 0] }}
        transition={{ duration: 0.7 }}
        className={{
          position: "absolute left-0 right-0 bottom-0",
          dimension: "mx-auto max-w-xl pt-5 px-5 pb-36",
          background: "bg-slate-600",
          otherStyles: "rounded-t-xl",
        }}
        aria-label="Sidebar"
        ref={ref}
      >
        <ul
          role="list"
          className="space-y-1 w-full -my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
        >
          {navLinks.map((navLink, index) => (
            <li
              key={navLink.name}
              className="w-full"
              onMouseEnter={() => {
                setIndex(index);
              }}
              onMouseLeave={() => {
                setIndex(null);
              }}
            >
              <Container.Link
                href={navLink.href}
                className={{
                  parent: clsx(
                    index === isIndex
                      ? "bg-zinc-50 text-orange-tertiary"
                      : "text-zinc-400 ",
                    "group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  ),
                }}
              >
                <navLink.icon
                  className={clsx(
                    index === isIndex
                      ? "text-orange-tertiary"
                      : "text-gray-400 ",
                    "h-6 w-6 shrink-0"
                  )}
                  aria-hidden="true"
                />
                <p>{navLink.name}</p>
              </Container.Link>
            </li>
          ))}
        </ul>
      </AnimatedContainer>
    </Container>
  );
});

NavbarListModal.displayName = "NavbarListModal";

const NavbarMobile = ({ navLinks }) => {
  const isSmallerScreen = useResponsive(1024);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    handleOutsideClick(modalRef, setIsVisible, buttonRef);
  }, [setIsVisible]);

  return (
    <Container className="absolute w-full z-20">
      <Container
        onClick={() => {
          isSmallerScreen && setIsVisible(!isVisible);
        }}
        className={{
          position:
            "fixed bottom-5 left-5 sm:left-auto sm:fixed sm:-top-10 sm:right-[15%] lg:top-0 lg:right-0 lg:relative self-center lg:self-start desktop-sm:self-center mx-auto",
          dimensions:
            "w-[3rem] h-[3rem] sm:w-[10rem] sm:h-[10rem] lg:w-[18rem] lg:h-[18rem] desktop-sm:w-[29rem] desktop-sm:h-[29rem] mr-10 desktop-sm:mr-0",
          otherStyles: "flex-shrink-0 cursor-pointer ",
        }}
      >
        <Button variant="navbarMobile">
          <Burger className="h-6 w-6 text-zinc-600" />
        </Button>
        <NavbarListModal
          navLinks={navLinks}
          isVisible={isVisible}
          ref={modalRef}
        />
      </Container>
    </Container>
  );
};

const NavbarIslandItem = ({ navLinks }) => {
  const { pathname } = useRouter();
  const updatedNavLinks = navLinks.filter((navLink) => !navLink.onlyMobile);

  return updatedNavLinks.map(({ name, href }) => (
    <Container as="li" key={name}>
      <Container.Link
        href={href}
        className={{
          parent: clsx(
            "relative block px-3 py-1 transition text-xs font-light",
            pathname === href
              ? "text-orange-secondary dark:text-orange-testiary"
              : "hover:text-orange-secondary dark:hover:text-orange-tertiary"
          ),
        }}
      >
        {name}
      </Container.Link>
    </Container>
  ));
};

const NavbarIsland = ({ navLinks }) => (
  <Container
    as="nav"
    className={{
      position: "absolute left-0 right-0 top-5 z-10",
      dimension: "max-w-lg mx-auto",
    }}
  >
    <Container.Flex
      as="ul"
      className={{
        flex: "justify-between items-center gap-x-10",
        dimension: "px-3 py-1 w-full",
        typography: "text-sm font-medium text-zinc-800 dark:text-zinc-200",
        background: "bg-gray-50 dark:bg-transparent",
        otherStyles: "list-none rounded-full",
      }}
    >
      <Container.Link href="/" className={{ parent: "shrink-0" }}>
        <Container.Logo
          src={rawDevLogo}
          alt="my-logo"
          className="h-10 w-10 rounded-full"
        />
      </Container.Link>
      <NavbarIslandItem navLinks={navLinks} />
    </Container.Flex>
  </Container>
);

const Navbar = ({ type }) => {
  const isSmallerScreen = useResponsive(1024);

  const { t } = useTranslation("navLinks");

  const navLinksTranslated = navLinks(t);

  if (type === "grid") return <NavbarGrid navLinks={navLinksTranslated} />;
  if (type === "list") return <NavbarMobile navLinks={navLinksTranslated} />;
  if (type === "blended" && isSmallerScreen)
    return <NavbarMobile navLinks={navLinksTranslated} />;
  if (type === "blended" && !isSmallerScreen)
    return <NavbarIsland navLinks={navLinksTranslated} />;
};

export default Navbar;
