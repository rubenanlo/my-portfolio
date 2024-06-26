import { Container } from "components/ui/Container";
import { Button } from "components/ui/Button";
import { useGoBack } from "../helpers/useGoBack";
import Loading from "components/modals/Loading";

const toolbarFeatures = {
  left: [{ name: "Back", icon: "Back" }],
  center: [
    {
      name: "Bold",
      icon: "B",
    },
    {
      name: "Italic",
      icon: "I",
    },
    {
      name: "Underline",
      icon: "U",
    },
    {
      name: "Upload image",
      icon: "Image",
    },
  ],
  right: [
    {
      name: "Submit",
      icon: "Submit",
    },
  ],
};

const Toolbar = () => {
  const { isLoading, handleBack } = useGoBack();
  return isLoading ? (
    <Loading />
  ) : (
    <Container.Flex
      className={{
        dimensions: "px-10",
        flex: "flex-col lg:flex-row items-start lg:justify-between",
      }}
    >
      <Container.Flex
        className={{ flex: "justify-center gap-x-2", dimensions: "mt-5" }}
      >
        {toolbarFeatures.left.map(({ name, icon }) => (
          <Button
            key={name}
            variant="secondary"
            text={icon}
            onClick={() => name === "Back" && handleBack()}
          />
        ))}
      </Container.Flex>
      <Container.Flex
        className={{
          flex: "justify-center gap-x-2 order-last lg:order-none",
          dimensions: "mt-5",
        }}
      >
        {toolbarFeatures.center.map(({ name, icon }) => (
          <Button key={name} variant="secondary" text={icon} />
        ))}
      </Container.Flex>
      <Container.Flex
        className={{
          flex: "justify-center gap-x-2",
          dimensions: "mt-5",
        }}
      >
        {toolbarFeatures.right.map(({ name, icon }) => (
          <Button key={name} variant="secondary" text={icon} />
        ))}
      </Container.Flex>
    </Container.Flex>
  );
};

export default Toolbar;
