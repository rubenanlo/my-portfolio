import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import Navbar from "components/Navbar";
import { RUBEN_HEADSHOT as profilePic } from "helpers/exportImages";
import { useResponsive } from "helpers/useResponsive";
import { socialInfo } from "library/socialInfo";

const Hero = () => {
  const isSmallerScreen = useResponsive(1024);

  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // Using state to track if router is ready to use. Applicable when sharing urls with filters
  const [isLoading, setIsLoading] = useState(false); // Using state to track if router is ready to use. Applicable when sharing urls with filters
  const { t } = useTranslation("hero");

  //  Translating the text in social info:
  const socialLinksTranslated = socialInfo(t);

  useEffect(() => {
    setIsReady(router.isReady);
    if (router.isReady && isLoading) {
      setIsLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const navbarType =
    !isReady || isLoading ? undefined : isSmallerScreen ? "list" : "grid";

  return (
    <Container.Section className="lg:py-40 w-full">
      <Container className="mt-10 lg:pt-8 w-full">
        <Image
          className="h-16 w-16 rounded-full dark:sepia"
          src={profilePic}
          alt="My Pic"
        />
        <Container.Flex>
          <TextLayout className="mt-5 w-full">
            <TextLayout.Title title={socialLinksTranslated.name} />
            <TextLayout.Subtitle subtitle={socialLinksTranslated.title} />
            <TextLayout.Paragraph
              className="mt-6 h-52 pr-10"
              paragraph={t("intro")}
            />
            <Container className="border-b border-zinc-200/40 w-1/3" />
            <Container.Flex
              className={{
                flex: "gap-x-6 items-center justify-start",
                dimension: "mt-5",
              }}
            >
              {socialLinksTranslated.social.map(({ Social, text, href }) => (
                <Container.Link
                  key={Social || text}
                  href={href}
                  target="_blank"
                  Component={Social}
                  text={text}
                  className={{
                    child:
                      "hover:fill-orange-primary dark:hover:fill-orange-tertiary",
                    parent:
                      "text-sm text-gray-400 transition hover:text-orange-primary dark:hover:text-orange-tertiary lg:z-10",
                  }}
                />
              ))}
            </Container.Flex>
          </TextLayout>
          <Navbar type={navbarType} />
        </Container.Flex>
      </Container>
    </Container.Section>
  );
};

export default Hero;
