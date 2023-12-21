import React from "react";
import clsx from "clsx";
import { Card } from "components/Card";
import { Container } from "components/Container";
import { AnimatedCard } from "components/Card";
import { TextLayout } from "components/TextLayout";
import { zoomIn } from "library/animations";

const cards = [
  {
    name: "Blog post",
    href: "/admin/blog",
    color: "bg-green-700 dark:bg-orange-tertiary",
  },
  {
    name: "My CV",
    href: "/admin/cv",
    color: "bg-green-600 dark:bg-orange-quaternary",
  },
];

const Circle = ({ name }) => {
  // Find the card with the matching name
  const card = cards.find((card) => card.name === name);
  // If a card is found, use its color; otherwise, provide a default color
  const color = card ? card.color : "bg-gray-200";

  return <div className={clsx(color, "rounded-full h-4 w-4")} />;
};

const dashboard = () => {
  return (
    <Container.Section fullScreen className="w-full">
      <Container.Columns
        className=" w-full mt-24 h-full"
        columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        content="content-start"
        justify="justify-items-center"
      >
        {cards.map(({ name, href }) => (
          <AnimatedCard key={name} animate={zoomIn} className="cursor-pointer">
            <Container.Link href={href}>
              <Circle name={name} />
              <Card.Header>
                <Container.Flex items="center" gapX="2" className="text-xl">
                  <TextLayout.Subtitle
                    subtitle={name}
                    className="text-zinc-500 text-xl"
                  />
                </Container.Flex>
              </Card.Header>
            </Container.Link>
          </AnimatedCard>
        ))}
      </Container.Columns>
    </Container.Section>
  );
};

export default dashboard;
