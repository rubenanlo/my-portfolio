import {
  WORK as work,
  SPOTIFY as spotify,
  EMAIL as email,
  BLOG as blog,
  CALENDAR as calendar,
} from "helpers/exportImages";

export const cards = [
  {
    title: "Dashboard",
    subtitle: "Select which feature you want to use",
    isHeader: true,
  },
  {
    name: "My music",
    href: "/admin/music",
    description: "Access your music player",
    tag: "Music",
    image: spotify,
  },
  {
    name: "Blog post",
    href: "/admin/cms",
    description: "Create, edit and delete blog posts",
    tag: "Reading",
    image: blog,
  },
  {
    name: "My CV",
    href: "/admin/cv",
    description:
      "Create, edit, and delete CV entries that go into the homepage",
    tag: "JobHunt",
    image: work,
  },
  {
    name: "Check your inbox",
    href: "#",
    description: "Check your emails and send messages",
    tag: "Productivity",
    image: email,
  },
  {
    name: "Check your calendar",
    href: "#",
    description: "Check, add, delete events in your calendar",
    tag: "Productivity",
    image: calendar,
  },
];
