import Image from "next/image";
import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import Navbar from "components/Navbar";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "components/SocialIcons";
import { RUBEN_HEADSHOT as profilePic } from "helpers/exportImages";
import { useResponsive } from "helpers/useResponsive";

const text = {
  name: "Ruben Andino",
  title: "Fullstack Web Developer, Economist",
  social: [
    {
      social: GitHubIcon,
      href: "https://github.com/rubenanlo",
    },
    {
      social: LinkedInIcon,
      href: "https://www.linkedin.com/in/ruben-andino/",
    },
    {
      social: TwitterIcon,
      href: "https://twitter.com/rubenanlo",
    },
    {
      social: InstagramIcon,
      href: "https://www.instagram.com/benjiebao/",
    },
    {
      text: "Check my other site →",
      href: "https://www.rawdev.io/",
    },
  ],
};

const Hero = () => {
  const isSmallerScreen = useResponsive(1024);
  const narvbarType = isSmallerScreen ? "stars" : "grid";

  return (
    <Container.Section className="lg:py-40 w-full z-10 ">
      <Container className="mt-10 max-w-md lg:max-w-none lg:mx-0 lg:pt-8 lg:pr-5 w-full ">
        <Image
          className="h-16 w-16 rounded-full dark:sepia"
          src={profilePic}
          alt="My Pic"
        />
        <Container.Flex>
          <TextLayout className="mt-5 w-full">
            <TextLayout.Title title={text.name} />
            <TextLayout.Subtitle subtitle={text.title} />
            <TextLayout.Paragraph
              className="mt-6"
              paragraph="As an economist with experience in consulting, I offer a distinct viewpoint. My specialty is in connecting business requirements with efficient web applications. With a passion for learning and improving everyday, I deliver customized solutions to generate the right brand awareness."
            />
            <Container.Flex className="gap-x-6 mt-10" items="items-center">
              {text.social.map(({ social, href }) => (
                <Container.Link
                  key={social || text}
                  href={href}
                  target="_blank"
                  Component={social}
                  className={{
                    component:
                      "hover:fill-orange-primary dark:hover:fill-orange-tertiary",
                    text: "text-sm shrink-0 text-gray-400 transition hover:text-orange-primary dark:hover:text-orange-tertiary sm:z-10",
                  }}
                />
              ))}
            </Container.Flex>
          </TextLayout>
          <Navbar type={narvbarType} />
        </Container.Flex>
      </Container>
    </Container.Section>
  );
};

export default Hero;
