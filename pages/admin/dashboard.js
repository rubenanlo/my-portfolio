import React from "react";
import { Card } from "components/Card";
import { Container } from "components/Container";

const dashboard = () => {
  return (
    <Container.Section fullScreen className="grid grid-cols-3 border w-full">
      <Card className="h-full">Dashboard</Card>
    </Container.Section>
  );
};

export default dashboard;
