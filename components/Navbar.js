import { useRef, useState, Suspense, useEffect, forwardRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { inSphere } from "maath/random";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Post } from "components/Post";
import { AnimatedCard } from "components/Card";
import { Container, AnimatedContainer } from "components/Container";
import { useResponsive } from "helpers/useResponsive";
import { handleOutsideClick } from "helpers/handleOutsideClick";
import { LOGO_LINKEDIN_1 as rawDevLogo } from "helpers/exportImages";
import { NAVLINKS as navLinks } from "library/navlinks";
import { zoomIn, popUp } from "library/animations";

const ArrowDiagonal = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
  </svg>
);

// !Change the Post component to a Card
const NavbarGridItem = ({ navLink }) => (
  <Container.Link href={navLink.href} className="focus:outline-none">
    <Post className="group relative">
      <Container>
        <Post.Icon
          className={{
            parent: "inline-flex rounded-lg p-3",
            child: {
              dimension: "h-6 w-6",
              typography:
                "text-zinc-800 dark:text-zinc-100  group-hover:text-orange-primary ",
            },
          }}
          Icon={navLink.icon}
          aria-hidden="true"
        />
        <Post.Icon
          className={{
            parent: {
              position: "absolute right-6 top-6",
              typography:
                "text-zinc-800 dark:text-zinc-100 group-hover:text-semibold",
              otherStyles: "pointer-events-none ",
            },
            child: "h-4 w-4",
          }}
          Icon={ArrowDiagonal}
          aria-hidden="true"
        ></Post.Icon>
      </Container>
      <Container className="mt-8">
        <Post.Title
          as="h3"
          className="text-base text-zinc-100  group-hover:text-semibold"
          title={navLink.name}
        ></Post.Title>
      </Container>
    </Post>
  </Container.Link>
);

const NavbarGrid = () => {
  const { resolvedTheme } = useTheme();
  const bgColor = resolvedTheme === "dark" ? "#010101" : "#E2E8F0";

  return (
    <Container
      as="nav"
      className={{ position: "relative", dimension: "w-full scale-90" }}
    >
      <Container.Columns
        className={{ dimension: "w-full", grid: "grid-cols-2 gap-x-10" }}
      >
        {navLinks.map((navLink) => (
          <AnimatedCard
            key={navLink.name}
            animate={{ ...zoomIn(bgColor), ...popUp }}
            className={{
              dimensions: "h-auto w-full",
              otherStyles: "cursor-pointer opacity-60 rounded-md",
            }}
          >
            <NavbarGridItem navLink={navLink} />
          </AnimatedCard>
        ))}
      </Container.Columns>
    </Container>
  );
};

NavbarGrid.displayName = "NavbarGrid";

const NavbarListModal = forwardRef(({ isVisible }, ref) => {
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
          background: "bg-zinc-800",
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
                  text: clsx(
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

const Stars = (props) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points
        ref={ref}
        positions={props.positions}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color={props.color}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const CameraAnimator = ({ isHovered }) => {
  useFrame(({ camera }) => {
    if (isHovered) {
      camera.position.lerp({ x: 0, y: 0, z: 0.5 }, 0.1);
    } else {
      camera.position.lerp({ x: 0, y: 0, z: 1.8 }, 0.1);
    }
  });

  return null; // This component does not render anything itself
};

const StarsCanvas = forwardRef(({ isHovered }, ref) => {
  const { resolvedTheme } = useTheme();
  const pointColor = resolvedTheme === "dark" ? "white" : "#111827";

  const sphere = inSphere(new Float32Array(3000), { radius: 1.15 });

  return (
    <Canvas className="rounded-full opacity-40 dark:opacity-50" ref={ref}>
      <CameraAnimator isHovered={isHovered} />
      <Suspense fallback={null}>
        <Stars color={pointColor} positions={sphere} />
      </Suspense>
    </Canvas>
  );
});

StarsCanvas.displayName = "StarsCanvas";

const NavbarStars = () => {
  const isSmallerScreen = useResponsive(1024);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const Component = NavbarListModal;
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    handleOutsideClick(modalRef, setIsVisible, buttonRef);
  }, [setIsVisible]);

  useEffect(() => {
    function adjustHeight() {
      if (buttonRef.current) {
        const viewportHeight = window.innerHeight;
        buttonRef.current.style.height = `${viewportHeight}px`;
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", adjustHeight);

      // Set initial height
      adjustHeight();
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", adjustHeight);
      }
    };
  }, [buttonRef]);

  return (
    <Container className="absolute w-full">
      <motion.div
        whileHover={!isSmallerScreen && { scale: 2 }}
        transition={{ duration: 1 }}
        onMouseEnter={() => {
          !isSmallerScreen && setHovered(true);
        }}
        onMouseLeave={() => {
          !isSmallerScreen && setHovered(false);
        }}
        onClick={() => {
          isSmallerScreen && setIsVisible(!isVisible);
        }}
        className="fixed bottom-5 left-5 sm:left-auto sm:fixed sm:-top-10 sm:right-[15%] lg:top-0 lg:right-0 lg:relative w-[3rem] h-[3rem] sm:w-[10rem] sm:h-[10rem] lg:w-[18rem] lg:h-[18rem] desktop-sm:w-[29rem] desktop-sm:h-[29rem] self-center lg:self-start mr-10 desktop-sm:mr-0 desktop-sm:self-center flex-shrink-0 cursor-pointer mx-auto"
      >
        <StarsCanvas
          isHovered={isHovered}
          setHovered={setHovered}
          ref={buttonRef}
        />
        <Component isVisible={isVisible} ref={modalRef} />
      </motion.div>
    </Container>
  );
};

const NavbarIslandItem = () => {
  const router = useRouter();
  const isActive = (name) => router.pathname.includes(name.toLowerCase());

  return navLinks.map(({ name, href }) => (
    <Container as="li" key={name}>
      <Container.Link
        href={href}
        className={{
          text: clsx(
            "relative block px-3 py-1 transition text-xs font-light",
            isActive(name)
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

const NavbarIsland = () => (
  <Container
    as="nav"
    className="absolute left-0 right-0 max-w-sm mx-auto top-5 z-10"
  >
    <Container.Flex
      as="ul"
      justify="justify-center"
      items="items-center"
      className="list-none rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-zinc-800  dark:bg-transparent dark:text-zinc-200"
    >
      <Container.Link
        href="/"
        className={{
          text: "mr-5",
        }}
        Component={Container.Logo}
        componentProps={{
          src: rawDevLogo,
          alt: "my-logo",
        }}
      />
      <NavbarIslandItem />
    </Container.Flex>
  </Container>
);

const Navbar = ({ type }) => {
  const isSmallerScreen = useResponsive(640);

  if (type === "grid") return <NavbarGrid />;
  if (type === "stars") return <NavbarStars />;
  if (type === "blended" && isSmallerScreen) return <NavbarStars />;
  if (type === "blended" && !isSmallerScreen) return <NavbarIsland />;
};

export default Navbar;
