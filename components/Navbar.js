import { useRef, useState, Suspense, useEffect, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { inSphere } from "maath/random";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Card } from "components/Card";
import { Container } from "components/Container";
import { useResponsive } from "helpers/useResponsive";
import { handleOutsideClick } from "helpers/handleOutsideClick";
import { NAVLINKS as navLinks } from "library/NavLinks";

const ArrowDiagonal = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
  </svg>
);

const NavbarItem = ({ navLink, navLinkIdx }) => (
  <Card
    className={clsx(
      navLinkIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
      navLinkIdx === 1 ? "sm:rounded-tr-lg" : "",
      navLinkIdx === navLinks.length - 2 ? "sm:rounded-bl-lg" : "",
      navLinkIdx === navLinks.length - 1
        ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
        : "",
      "group relative bg-gray-200/90 dark:bg-zinc-500/90 hover:bg-gray-300/90 dark:hover:bg-orange-tertiary p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    )}
  >
    <Container>
      <Card.Icon
        className={{
          span: "inline-flex rounded-lg p-3",
          component:
            "h-6 w-6 text-zinc-800 dark:text-zinc-100  group-hover:text-orange-primary ",
        }}
        Icon={navLink.icon}
        aria-hidden="true"
      />
      <Card.Icon
        className={{
          span: "pointer-events-none absolute right-6 top-6 text-zinc-100 group-hover:text-orange-primary dark:group-hover:text-zinc-800",
          component: "h-4 w-4",
        }}
        Icon={ArrowDiagonal}
        aria-hidden="true"
      ></Card.Icon>
    </Container>
    <Container className="mt-8">
      <Card.Title
        as="h3"
        className="text-xl font-semibold leading-6 text-zinc-100 dark:text-zinc-100 group-hover:text-zinc-800"
      >
        <Container.Link href={navLink.href} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {navLink.name}
        </Container.Link>
      </Card.Title>
    </Container>
  </Card>
);

// Basic Modal Component
const NavbarGridModal = forwardRef(({ isVisible }, ref) => {
  if (!isVisible) return null;

  return (
    <nav
      className="modal absolute -top-40 sm:top-[50%] left-[20%] desktop-sm:left-[30%] scale-50 shadow-2xl"
      ref={ref}
    >
      <Container.Flex className="modal-content flex-col bg-zinc-800/50 rounded-2xl max-w-5xl w-[10rem] text-xs">
        <Container.Columns2 className="absolute -top-40 -left-28 w-[25rem] divide-y  overflow-hidden rounded-lg shadow sm:gap-px sm:divide-y-0 scale-75">
          {navLinks.map((navLink, navLinkIdx) => (
            <NavbarItem
              key={navLink.name}
              navLink={navLink}
              navLinkIdx={navLinkIdx}
            />
          ))}
        </Container.Columns2>
      </Container.Flex>
    </nav>
  );
});

NavbarGridModal.displayName = "NavbarGridModal";

const NavbarListModal = forwardRef(({ isVisible }, ref) => {
  const [isIndex, setIndex] = useState(null);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-zinc-800/70">
      <motion.nav
        animate={{ opacity: [0, 1], y: [200, 0] }}
        transition={{ duration: 0.7 }}
        className="absolute left-0 right-0 bottom-0 mx-auto max-w-xl rounded-t-xl bg-zinc-800 pt-5 px-5 pb-36"
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
      </motion.nav>
    </div>
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
    <Canvas className="rounded-full" ref={ref}>
      <CameraAnimator isHovered={isHovered} />
      <Suspense fallback={null}>
        <Stars color={pointColor} positions={sphere} />
      </Suspense>
    </Canvas>
  );
});

StarsCanvas.displayName = "StarsCanvas";

const Navbar = () => {
  const isSmallerScreen = useResponsive(1024);
  const [isGridModalVisible, setGridModalVisible] = useState(false);
  const [isListModalVisible, setListModalVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const Component = isSmallerScreen ? NavbarListModal : NavbarGridModal;
  const isVisible = isSmallerScreen ? isListModalVisible : isGridModalVisible;
  const setIsVisible = isSmallerScreen
    ? setListModalVisible
    : setGridModalVisible;
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
    <div className="absolute w-full">
      <motion.div
        whileHover={!isSmallerScreen && { scale: 2 }}
        transition={{ duration: 1 }}
        onMouseEnter={() => {
          !isSmallerScreen && setGridModalVisible(true);
          !isSmallerScreen && setHovered(true);
        }}
        onMouseLeave={() => {
          !isSmallerScreen && setGridModalVisible(false);
          !isSmallerScreen && setHovered(false);
        }}
        onClick={() => {
          isSmallerScreen && setListModalVisible(!isListModalVisible);
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
    </div>
  );
};

export default Navbar;
