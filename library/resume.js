import { setUniqueId } from "helpers/setUniqueId";

export const resume = (t) =>
  setUniqueId([
    {
      company: "UNSDSN",
      title: t && t("positionWeb"),
      logo: "unsdsn_logo",
      start: "2022",
      end: t("present"),
    },
    {
      company: "rawDev",
      title: t && t("positionWeb"),
      logo: "logo_linkedin_1",
      start: "2022",
      end: t("present"),
    },
    {
      company: "Baker McKenzie",
      title: t && t("positionData"),
      logo: "baker_mckenzie_logo",
      start: "2021",
      end: "2022",
    },
    {
      company: "PWC",
      title: t && t("positionData"),
      logo: "pwc_logo",
      start: "2019",
      end: "2021",
    },
    {
      company: "EY",
      title: t && t("positionData"),
      logo: "ey_logo",
      start: "2011",
      end: "2019",
    },
    {
      company: "Deloitte",
      title: t && t("positionData"),
      logo: "deloitte_logo",
      start: "2008",
      end: "2010",
    },
  ]);
