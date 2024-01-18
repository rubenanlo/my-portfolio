import {
  EY_LOGO as eyLogo,
  DELOITTE_LOGO as deloitteLogo,
  LOGO_LINKEDIN_1 as rawDevLogo,
  PWC_LOGO as pwcLogo,
  UNSDSN_LOGO as sdsnLogo,
  BAKER_MCKENZIE_LOGO as bakerLogo,
} from "helpers/exportImages";
import { setUniqueId } from "helpers/setUniqueId";

const resume = [
  {
    company: "UNSDSN",
    title: "Fullstack Web Developer",
    logo: sdsnLogo,
    start: "2022",
    end: "Present",
  },
  {
    company: "rawDev",
    title: "Fullstack Web Developer",
    logo: rawDevLogo,
    start: "2022",
    end: "Present",
  },
  {
    company: "Baker McKenzie",
    title: "Economist, Data visualizations",
    logo: bakerLogo,
    start: "2021",
    end: "2022",
  },
  {
    company: "PWC",
    title: "Economist, Data visualizations",
    logo: pwcLogo,
    start: "2019",
    end: "2021",
  },
  {
    company: "EY",
    title: "Economist, Data visualizations",
    logo: eyLogo,
    start: "2011",
    end: "2019",
  },
  {
    company: "Deloitte",
    title: "Economist, Data visualizations",
    logo: deloitteLogo,
    start: "2008",
    end: "2010",
  },
];

export default setUniqueId(resume);
