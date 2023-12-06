import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

const Footer = () => (
  <Container.Section
    as="footer"
    className="justify-self-end w-full px-6 pt-10 lg:px-20 pb-0 sm:pb-0 md:pb-0 lg:pb-0"
  >
    <Container className="border-t border-zinc-900/20 dark:border-zinc-100/20 pb-16 pt-10">
      <Container.Flex className="flex-col items-center justify-between gap-6 sm:flex-row sm:px-5">
        <Container.Flex className="flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {navLinks.map(({ name, href }) => (
            <Container.Link
              key={name}
              href={href}
              className="transition hover:text-orange-primary dark:hover:text-orange-tertiary"
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
