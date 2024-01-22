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
  },
  {
    name: "My portfolio",
    description:
      "A portal to showcase my work, with translation and CMS capabilities",
    href: "https://ruben-andino.rawdev.io/",
    image: myPortfolio,
  },
  {
    name: "Europe Sustainable Development Report",
    description:
      "This is a data visualization to showcase the performance of European countries towards the UN sustainable development goals.",
    href: "https://eu-dashboards.sdgindex.org/",
    image: euSdr,
  },
  {
    name: "rawDev",
    description:
      "Website dedicated to web development services, so that potential clients can get in contact with rawDev",
    href: "https://www.rawdev.io/",
    image: rawdev,
  },
  {
    name: "SDG Transformation Center",
    description:
      "Static website which includes an online library for the SDG Transformation Center, so that people can get access to publications and other resources",
    href: "https://dashboards.sdgindex.org/",
    image: sdgTc,
  },
  {
    name: "Sustainable Development Report",
    description:
      "This is a data visualization to showcase the performance of UN members towards the UN sustainable development goals.",
    href: "https://dashboards.sdgindex.org/",
    image: sdr,
  },
  {
    name: "Benin Sustainable Development Report",
    description:
      "A data visualization tracking performance of Benin towards the Leave-No-One-Behind indicators.",
    href: "https://dashboards.sdgindex.org/",
    image: benin,
  },
  {
    name: "Guithub ",
    description:
      "A community of guitar enthusiasts to share their passion for music.",
    href: "https://github.com/rubenanlo/guithub",
    image: "",
  },
  {
    name: "Tick-tock Diaper",
    description: "Javascript game to change as many diapers as you can!",
    href: "https://rubenanlo.github.io/tick-tock-diaper/",
    image: tickTock,
  },
  {
    name: "",
    description: "Javascript game to change as many diapers as you can!",
    href: "https://rubenanlo.github.io/tick-tock-diaper/",
    image: "",
  },
];
