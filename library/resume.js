import {
  EY_LOGO as eyLogo,
  DELOITTE_LOGO as deloitteLogo,
  LOGO_LINKEDIN_1 as rawDevLogo,
  PWC_LOGO as pwcLogo,
  UNSDSN_LOGO as sdsnLogo,
  BAKER_MCKENZIE_LOGO as bakerLogo,
} from "helpers/exportImages";
import { setUniqueId } from "helpers/setUniqueId";

export const resume = (t) =>
  setUniqueId([
    {
      company: "UNSDSN",
      title: t && t("positionWeb"),
      logo: sdsnLogo,
      start: "2022",
      end: t("present"),
    },
    {
      company: "rawDev",
      title: t && t("positionWeb"),
      logo: rawDevLogo,
      start: "2022",
      end: t("present"),
    },
    {
      company: "Baker McKenzie",
      title: t && t("positionData"),
      logo: bakerLogo,
      start: "2021",
      end: "2022",
    },
    {
      company: "PWC",
      title: t && t("positionData"),
      logo: pwcLogo,
      start: "2019",
      end: "2021",
    },
    {
      company: "EY",
      title: t && t("positionData"),
      logo: eyLogo,
      start: "2011",
      end: "2019",
    },
    {
      company: "Deloitte",
      title: t && t("positionData"),
      logo: deloitteLogo,
      start: "2008",
      end: "2010",
    },
  ]);
