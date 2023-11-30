import Image from "next/image";
import { Container } from "components/Container";
import { TextLayout } from "components/TextLayout";
import StarsCanvas from "components/Stars";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "components/SocialIcons";
import { RUBEN_HEADSHOT as profilePic } from "helpers/exportImages";

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
  return (
    <Container className="relative isolate">
      <Container className="lg:flex mx-auto max-w-4xl desktop-sm:max-w-6xl justify-center gap-x-10 px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
        <Container className="mt-10 lg:pl-20 mx-auto max-w-md flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <Image
            className="h-16 w-16 rounded-full dark:sepia"
            src={profilePic}
            alt="My Pic"
          />
          <TextLayout className="mt-5">
            <TextLayout.Title title={text.name} />
            <TextLayout.Subtitle subtitle={text.title} />
            <TextLayout.Paragraph paragraph="As an economist with experience in consulting, I offer a distinct viewpoint. My specialty is in connecting business requirements with efficient web applications. With a passion for learning and improving everyday, I deliver customized solutions to generate the right brand awareness." />
            <Container.Flex className="items-center gap-x-6 mt-10">
              {text.social.map(({ social, href, text }) => (
                <Container.Link
                  key={social || text}
                  href={href}
                  target="_blank"
                  Component={social}
                  text={text}
                  className="text-sm shrink-0 text-gray-400"
                />
              ))}
            </Container.Flex>
          </TextLayout>
        </Container>
        <StarsCanvas />
      </Container>
    </Container>
  );
};

export default Hero;
