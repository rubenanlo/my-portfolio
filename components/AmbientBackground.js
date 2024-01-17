// This component was leveraged from this repo and reworked it to fit my needs:
// https://github.com/crnacura/AmbientCanvasBackgrounds

import { useEffect, useRef } from "react";
import { Container } from "components/Container";
import { setupTwirl, resize } from "helpers/setTwirlAmbient";

const AmbientCanvasBackground = () => {
  const canvasRef = useRef(null); // for canvas reference

  useEffect(() => {
    setupTwirl();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Container className="content content--canvas bg-transparent">
      <canvas ref={canvasRef}></canvas>
    </Container>
  );
};

export default AmbientCanvasBackground;
