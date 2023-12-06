import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { inSphere } from "maath/random";
import { motion } from "framer-motion";

// Basic Modal Component
const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Your Navbar Menu Here</p>
      </div>
    </div>
  );
};

const Stars = (props) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points
        ref={ref}
        positions={props.positions}
        stride={3}
        frustumCulled
        {...props}
      >
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

const CameraAnimator = ({ isHovered }) => {
  useFrame(({ camera }) => {
    if (isHovered) {
      camera.position.lerp({ x: 0, y: 0, z: 0.5 }, 0.1);
    } else {
      camera.position.lerp({ x: 0, y: 0, z: 1.8 }, 0.1);
    }
  });

  return null; // This component does not render anything itself
};

const StarsCanvas = () => {
  const { resolvedTheme } = useTheme();
  const pointColor = resolvedTheme === "dark" ? "white" : "#111827";
  const [isHovered, setHovered] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const sphere = inSphere(new Float32Array(3000), { radius: 1.15 });

  const handleCloseModal = () => {
    setModalVisible(false);
    setHovered(false);
  };

  return (
    <div className="absolute w-full">
      <motion.div
        whileHover={{ scale: 2 }}
        transition={{ duration: 1 }}
        onMouseEnter={() => {
          setModalVisible(true);
          setHovered(true);
        }}
        onMouseLeave={() => {
          setModalVisible(false);
          setHovered(false);
        }}
        className="absolute bottom-5 left-5 sm:left-auto sm:absolute sm:-top-10 sm:-right-24 lg:top-0 lg:right-0 lg:relative w-[3rem] h-[3rem] sm:w-[10rem] sm:h-[10rem] lg:w-[18rem] lg:h-[18rem] desktop-sm:w-[29rem] desktop-sm:h-[29rem] self-center lg:self-start mr-10 desktop-sm:mr-0 desktop-sm:self-center flex-shrink-0 cursor-pointer mx-auto"
      >
        <Canvas className="rounded-full">
          <CameraAnimator isHovered={isHovered} />
          <Suspense fallback={null}>
            <Stars
              color={pointColor}
              positions={sphere}
              setHovered={setHovered}
            />
          </Suspense>
        </Canvas>
        <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
      </motion.div>
    </div>
  );
};

export default StarsCanvas;
