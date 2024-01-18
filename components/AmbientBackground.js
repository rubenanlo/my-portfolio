// This component was leveraged from this repo and reworked it to fit my needs:
// https://github.com/crnacura/AmbientCanvasBackgrounds

import { useEffect, useRef } from "react";
import { Container } from "components/Container";
import { setupTwirl, resize } from "helpers/setTwirlAmbient";

const AmbientCanvasBackground = () => {
  const canvasRef = useRef(null); // for canvas reference

  useEffect(() => {
    const canvasRefCurrent = canvasRef.current;
    if (canvasRef.current) {
      setupTwirl(canvasRef.current);
      window.addEventListener("resize", () => resize(canvasRef.current));
    }

    return () => {
      window.removeEventListener("resize", () => resize(canvasRefCurrent));
    };
  }, [canvasRef]);

  return (
    <Container className="content--canvas fixed">
      <canvas ref={canvasRef} />
    </Container>
  );
};

export default AmbientCanvasBackground;
