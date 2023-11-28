import { useRef, Suspense } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random";

const Stars = (props) => {
  const ref = useRef();
  const sphere = inSphere(new Float32Array(5000), { radius: 1.2 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={props.color}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const { resolvedTheme } = useTheme();
  const pointColor = resolvedTheme === "dark" ? "white" : "gray";

  return (
    <div className="absolute -top-10 -right-24 lg:top-0 lg:right-0 lg:relative w-[10rem] h-[10rem] lg:w-[18rem] lg:h-[18rem] desktop-sm:w-[29rem] desktop-sm:h-[29rem] self-center lg:self-start mr-10 desktop-sm:mr-0 desktop-sm:self-center flex-shrink-0 border border-gray-600 dark:border-slate-600 rounded-full">
      <Canvas camera={{ position: [0, 1.5, 1] }}>
        <Suspense fallback={null}>
          <Stars color={pointColor} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
