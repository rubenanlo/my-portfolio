import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";

const Footer = () => {
  return (
    <footer className="justify-self-end w-full mx-auto max-w-4xl desktop-sm:max-w-6xl px-6 pt-10 lg:px-20">
      <Container className="border-t border-zinc-900/20 dark:border-zinc-100/20 pb-16 pt-10">
        <Container.Flex className="flex-col items-center justify-between gap-6 sm:flex-row">
          <Container.Flex className="flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            <Container.Link
              href="/about"
              className="transition hover:text-teal-500 dark:hover:text-teal-400"
            >
              About
            </Container.Link>
            <Container.Link href="/projects">Projects</Container.Link>
            <Container.Link href="/blog">Blog Post</Container.Link>
          </Container.Flex>
          <TextLayout.Paragraph
            className="mt-0 text-sm text-zinc-400 dark:text-zinc-500 text-center"
            paragraph={`&copy; ${new Date().getFullYear()} Ruben Andino. All rights reserved.`}
          />
        </Container.Flex>
      </Container>
    </footer>
  );
};

export default Footer;
