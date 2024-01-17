import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { NAVLINKS as navLinks } from "../library/navlinks";

const Footer = () => (
  <Container.Section
    as="footer"
    bottomDiv
    className={{ dimension: "w-full px-6 pt-10 lg:px-20 pb-32 lg:pb-0" }}
  >
    <Container
      className={{
        dimenstion: "pt-10",
        border: "border-t border-zinc-900/20 dark:border-zinc-100/20",
      }}
    >
      <Container.Flex
        className={{
          flex: "gap-6 flex-col sm:flex-row items-center justify-between",
          dimension: " sm:px-5",
        }}
      >
        <Container.Flex
          className={{
            flex: "flex-wrap gap-x-6 gap-y-1 justify-center",
            typography: "text-sm font-medium text-zinc-800 dark:text-zinc-200",
          }}
        >
          {navLinks.map(({ name, href }) => (
            <Container.Link
              key={name}
              href={href}
              className={{
                typography:
                  "hover:text-orange-primary dark:hover:text-orange-tertiary",
                otherStyles: "transition",
              }}
            >
              {name}
            </Container.Link>
          ))}
        </Container.Flex>
        <TextLayout.Paragraph
          className={{
            position: "mt-0",
            typography: "text-sm text-zinc-400 dark:text-zinc-500 text-center",
          }}
          paragraph={`© ${new Date().getFullYear()} Ruben Andino. All rights reserved.`}
        />
      </Container.Flex>
    </Container>
  </Container.Section>
);

export default Footer;
