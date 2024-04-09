import clsx from "clsx";
import { Container, AnimatedContainer } from "components/ui/Container";
import { LOGO_LINKEDIN_1 as rawDev } from "helpers/exportImages";
import { loadingMotion } from "library/animations";

const Loading = ({ noBackground }) => (
  <Container
    className={clsx(
      noBackground ? "" : "dark:bg-zinc-900 bg-zinc-300",
      "absolute top-0 left-0 h-[100vh] w-[100vw] z-20"
    )}
  >
    <Container
      className={{
        position: "fixed inset-0 z-10",
        otherStyles: "overflow-y-auto",
      }}
    >
      <Container.Flex
        className={{
          flex: "items-center",
          dimension: "p-4 sm:p-0 min-h-full",
          typography: "text-center",
        }}
      >
        <AnimatedContainer
          animate={loadingMotion}
          className="relative overflow-hidden flex justify-center items-center w-full"
        >
          <Container.Logo
            priority
            className="h-20 w-auto mr-28"
            src={rawDev}
            alt="logo"
          />
        </AnimatedContainer>
      </Container.Flex>
    </Container>
  </Container>
);

export default Loading;
