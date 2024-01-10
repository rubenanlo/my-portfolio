import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import { NAVLINKS as navLinks } from "../library/navlinks";

const Footer = () => (
  <Container.Section
    as="footer"
    bottomDiv
    className="w-full px-6 pt-10 lg:px-20 pb-0"
  >
    <Container className="border-t border-zinc-900/20 dark:border-zinc-100/20 pt-10">
      <Container.Flex
        className="gap-6 sm:flex-row sm:px-5"
        items="items-center"
        justify="justify-between"
      >
        <Container.Flex
          className="gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          justify="justify-center"
          wrap
        >
          {navLinks.map(({ name, href }) => (
            <Container.Link
              key={name}
              href={href}
              className={{
                text: "transition hover:text-orange-primary dark:hover:text-orange-tertiary",
              }}
            >
              {name}
            </Container.Link>
          ))}
        </Container.Flex>
        <TextLayout.Paragraph
          className="mt-0 text-sm text-zinc-400 dark:text-zinc-500 text-center"
          paragraph={`© ${new Date().getFullYear()} Ruben Andino. All rights reserved.`}
        />
      </Container.Flex>
    </Container>
  </Container.Section>
);

export default Footer;
