import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "components/ui/Button";
import { Container } from "components/ui/Container";
import { useRouter } from "next/router";

const SunIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
    <path
      d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
      fill="none"
    />
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeToggle = () => {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="theme"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </Button>
  );
};

const Language = () => {
  const languages = ["en", "fr"];
  const router = useRouter();
  // I am excluding the routes for the blog posts slug and the admin page
  const excludedRoute = (route) =>
    ["blog/", "admin"].some((path) => route.includes(path));

  const changeLanguage = (language) => {
    router.push(router.asPath, router.asPath, { locale: language });
  };

  return excludedRoute(router.asPath) ? null : (
    <Container className="w-full">
      <Container
        className={{
          position: "lg:absolute lg:right-20 lg:top-3",
          dimensions: "w-fit lg:mx-auto",
          background: "shadow z-10",
          otherStyles:
            "overflow-hidden rounded-b-lg lg:rounded-lg divide-x divide-gray-200/40",
        }}
      >
        {languages.map((language) => (
          <Button
            type="button"
            variant="language"
            key={language}
            condition={router.locale === language}
            onClick={() => changeLanguage(language)}
          >
            {language}
          </Button>
        ))}
      </Container>
    </Container>
  );
};

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <Container className="w-full flex justify-center lg:z-20">
      <ThemeToggle />
      {pathname !== "/admin" && <Language />}
    </Container>
  );
};
