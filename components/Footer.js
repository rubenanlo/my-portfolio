import Link from "next/link";

import { Container } from "components/Container";

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

const Footer = () => {
  return (
    <footer className="flex-none mx-auto max-w-4xl desktop-sm:max-w-6xl px-6 pt-10 lg:px-8">
      <div className="border-t border-zinc-100/20 pb-16 pt-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/blog">Blog Post</NavLink>
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} Ruben Andino. All rights
              reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
