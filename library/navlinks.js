import { Container } from "components/Container";
import { Email } from "library/socialIcons";

const ProjectIcon = (props) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="18"
    viewBox="0 0 576 512"
    {...props}
  >
    <path d="M256 0c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H256zM96 72V440c0 13.3 10.7 24 24 24s24-10.7 24-24V72c0-13.3-10.7-24-24-24s-24 10.7-24 24zM0 120V392c0 13.3 10.7 24 24 24s24-10.7 24-24V120c0-13.3-10.7-24-24-24S0 106.7 0 120z" />
  </svg>
);

const AboutIcon = (props) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="18"
    viewBox="0 0 576 512"
    {...props}
  >
    <path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z" />
  </svg>
);

const BlogIcon = (props) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M395.8 39.6c9.4-9.4 24.6-9.4 33.9 0l42.6 42.6c9.4 9.4 9.4 24.6 0 33.9L417.6 171 341 94.4l54.8-54.8zM318.4 117L395 193.6l-219 219V400c0-8.8-7.2-16-16-16H128V352c0-8.8-7.2-16-16-16H99.4l219-219zM66.9 379.5c1.2-4 2.7-7.9 4.7-11.5H96v32c0 8.8 7.2 16 16 16h32v24.4c-3.7 1.9-7.5 3.5-11.6 4.7L39.6 472.4l27.3-92.8zM452.4 17c-21.9-21.9-57.3-21.9-79.2 0L60.4 329.7c-11.4 11.4-19.7 25.4-24.2 40.8L.7 491.5c-1.7 5.6-.1 11.7 4 15.8s10.2 5.7 15.8 4l121-35.6c15.4-4.5 29.4-12.9 40.8-24.2L495 138.8c21.9-21.9 21.9-57.3 0-79.2L452.4 17zM331.3 202.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-128 128c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128z" />
  </svg>
);

const AdminIcon = (props) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="14"
    viewBox="0 0 448 512"
    {...props}
  >
    <path d="M144 128v64H304V128c0-44.2-35.8-80-80-80s-80 35.8-80 80zM96 192V128C96 57.3 153.3 0 224 0s128 57.3 128 128v64h32c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H96zM48 256V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V256c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16z" />
  </svg>
);

const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
    <path
      fill="currentColor"
      d="M288 .5l15.5 13.2 264 224-31.1 36.6L512 253.5V488v24H488 88 64V488 253.5L39.5 274.3 8.5 237.7l264-224L288 .5zm0 62.9L112 212.8V464h80V296 272h24H360h24v24V464h80V212.8L288 63.5zM240 464h96V320H240V464z"
    />
  </svg>
);

export const NAVLINKS = [
  { name: "Home", href: "/", onlyMobile: true, icon: HomeIcon },
  { name: "About", href: "/about", icon: AboutIcon },
  { name: "Projects", href: "/projects", icon: ProjectIcon },
  { name: "Blog", href: "/blog", icon: BlogIcon },
  { name: "Admin", href: "/admin/dashboard", icon: AdminIcon },
];

export const EmailLink = () => (
  <Container.Link
    Component={Email}
    href="mailto:info@rawdev.io"
    className={{
      child:
        "text-gray-400 hover:text-orange-primary dark:hover:text-orange-tertiary",
    }}
  />
);
