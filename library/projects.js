import {
  MITIGATION_TOOLKIT as mitigationToolkit,
  BENIN as benin,
  EU_SDR as euSdr,
  SDR as sdr,
  MY_PORTFOLIO as myPortfolio,
  RAWDEV as rawdev,
  SDG_TC as sdgTc,
  TICK_TOCK as tickTock,
} from "helpers/exportImages";

export const work = [
  {
    title: "My projects",
    subtitle: "A selection of all my projects",
    techStack: {
      Frameworks: "React, Next.js",
      Languages: "JavaScript, Python, Bash, Node.js, HTML, CSS",
      Databases: "MongoDB",
      Libraries:
        "D3.js, Nivo, Framer Motion, Redux, Recoil, MobX, among others",
      "CSS Libraries": "TailwindCSS, styled-components",
    },
  },
  {
    name: "Mitigation Toolkit",
    description:
      "A data visualization on greenhouse gas (GHG) mitigation options for agriculture and land use in different countries. Tip: Select China for all functionalities",
    href: "https://deploy-preview-8--mitigation-toolkit.netlify.app/",
    image: mitigationToolkit,
    category: "project",
  },
  {
    name: "JEST full data testing",
    description:
      "A way to test full datasets with JEST (e.g., 3 seconds for 3,500 tests)",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "My portfolio",
    description:
      "A portal to showcase my work, host my own blog posts, including translation and CMS capabilities",
    href: "https://ruben-andino.rawdev.io/",
    image: myPortfolio,
    category: "project",
  },
  {
    name: "usePagination",
    description: "Custom hook to create pagination for any list of items",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "useResponsive",
    description:
      "Custom hook to detect the current breakpoint allowing to render different components based on the screen size",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "usAnimatedValue",
    description:
      "Custom hook to animate values with Framer Motion, allowing to animate numbers",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "Europe Sustainable Development Report",
    description:
      "This is a data visualization to showcase the performance of European countries towards the UN sustainable development goals.",
    href: "https://eu-dashboards.sdgindex.org/",
    image: euSdr,
    category: "project",
  },
  {
    name: "rawDev",
    description:
      "Website dedicated to web development services, so that potential clients can get in contact with rawDev",
    href: "https://www.rawdev.io/",
    image: rawdev,
    category: "project",
  },
  {
    name: "Image optimization",
    description:
      "Automation of image optimization with AVIF, png and WebP formats, so that images are optimized for the web",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "SDG Transformation Center",
    description:
      "Static website which includes an online library for the SDG Transformation Center, so that people can get access to publications and other resources",
    href: "https://dashboards.sdgindex.org/",
    image: sdgTc,
    category: "project",
  },
  {
    name: "Sustainable Development Report",
    description:
      "This is a data visualization to showcase the performance of UN members towards the UN sustainable development goals.",
    href: "https://dashboards.sdgindex.org/",
    image: sdr,
    category: "project",
  },
  {
    name: "Heatmap",
    description: "A heatmap to visualize specific data points in a matrix",
    href: "TODO",
    category: "code snippets",
  },
  {
    name: "Benin Sustainable Development Report",
    description:
      "A data visualization tracking performance of Benin towards the Leave-No-One-Behind indicators.",
    href: "https://dashboards.sdgindex.org/",
    image: benin,
    category: "project",
  },
  {
    name: "Guithub ",
    description:
      "A community of guitar enthusiasts to share their passion for music.",
    href: "https://github.com/rubenanlo/guithub",
    image: "",
    category: "project",
  },
  {
    name: "Tick-tock Diaper",
    description: "Javascript game to change as many diapers as you can!",
    href: "https://rubenanlo.github.io/tick-tock-diaper/",
    image: tickTock,
    category: "project",
  },
  {
    name: "Supply chain analysis",
    description:
      "Generating a supply chain analysis with automation capabilities",
    href: "TODO",
    image: "",
    category: "project",
  },
  {
    name: "Return on investment analysis and data visualization",
    description:
      "Generating a return on R&D investment analysis, along with a self-generated report as an output",
    href: "TODO",
    image: "",
    category: "project",
  },
  {
    name: "Best practices for data analyses and data visualizations",
    description:
      "Development of best practices for data analyses and data visualizations in the US Northeast region",
    href: "TODO",
    image: "",
    category: "project",
  },
  {
    name: "Data tables",
    description:
      "Development of an automated tool to self-generate tables for reports",
    href: "TODO",
    image: "",
    category: "project",
  },
];
