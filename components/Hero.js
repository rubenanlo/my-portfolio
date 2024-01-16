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
      Social: GitHubIcon,
      href: "https://github.com/rubenanlo",
    },
    {
      Social: LinkedInIcon,
      href: "https://www.linkedin.com/in/ruben-andino/",
    },
    {
      Social: TwitterIcon,
      href: "https://twitter.com/rubenanlo",
    },
    {
      Social: InstagramIcon,
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
  const navbarType = isSmallerScreen ? "stars" : "grid";

  return (
    <Container.Section className="lg:py-40 w-full z-10">
      <Container className="mt-10 lg:pt-8 w-full">
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
              paragraph="I am a Full Stack Web Developer with a background in economics. My primarily focus is to build simple web applications based on complex data, by understanding and addressing business needs, automating processes to minimize human error, and allowing code reusability, and seamless code maintenance."
            />
            <Container.Flex
              className={{
                flex: "gap-x-6 items-center justify-start",
                dimension: "mt-10",
              }}
            >
              {text.social.map(({ Social, text, href }) => (
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
                      "text-sm shrink-0 text-gray-400 transition hover:text-orange-primary dark:hover:text-orange-tertiary lg:z-10",
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
