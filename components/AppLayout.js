import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Header } from "components/Header";
import Footer from "components/Footer";
import { Container } from "components/Container";
import Navbar from "components/Navbar";

const WaterMark = () => (
  <Container
    className="fixed left-[calc(50%-4rem)] top-10 overflow-x-hidden transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
    aria-hidden="true"
  >
    <div
      className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#fafbfb] to-[#000000] opacity-30"
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

  const noFooterPaths = ["/admin"];
  const noBlendedNavbarPaths = ["/"];
  const hasFooter = noFooterPaths.some((path) => asPath !== path);
  const hasBlendedNavbar = !noBlendedNavbarPaths.includes(asPath);

  return (
    <Container className="relative bg-slate-200 dark:bg-black h-screen antialiased overflow-x-hidden scrollbar pt-20 ">
      {hasBlendedNavbar && <Navbar type="blended" />}
      {resolvedTheme === "dark" && <WaterMark />}
      <Header />
      <div className="flex flex-col justify-between font-lato bg-gray-100 dark:bg-gray-900 text-gray-200 max-w-sm lg:max-w-4xl desktop-sm:max-w-6xl mx-auto rounded-t-2xl">
        {children}
        {hasFooter && <Footer />}
      </div>
    </Container>
  );
};
