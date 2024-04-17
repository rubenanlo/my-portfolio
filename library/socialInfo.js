import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
} from "library/socialIcons";
import { Email } from "library/socialIcons";
import { MAILTO as mailTo } from "root/config";

export const socialInfo = (t) => ({
  name: t && t("name"),
  title: t && t("title"),
  social: [
    {
      Social: GitHubIcon,
      href: "https://github.com/rubenanlo",
    },
    {
      Social: LinkedInIcon,
      href: "https://linkedin.com/in/ruben-andino/",
    },
    {
      Social: MediumIcon,
      href: "https://medium.com/@rubenanlo",
    },
    {
      Social: InstagramIcon,
      href: "https://instagram.com/benjiebao/",
    },
    {
      Social: Email,
      href: mailTo,
    },
    {
      text: t && t("checkSite"),
      href: "https://rawdev.io/",
    },
  ],
});
