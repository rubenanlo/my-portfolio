import { Container } from "components/Container";

const ShowTruncated = ({ value, isVisible, mousePosition = 0 }) => (
  <>
    {value && isVisible && (
      <Container
        className={{
          position: "fixed z-10",
          dimension: "p-2",
          typography: "text-xs text-gray-600",
          background: "bg-white",
          otherStyles: "rounded-md shadow-md",
        }}
        style={{
          left: `${mousePosition.x + 8}px`,
          top: `${mousePosition.y + 30}px`,
        }}
      >
        <>{value}</>
      </Container>
    )}
  </>
);

export default ShowTruncated;
