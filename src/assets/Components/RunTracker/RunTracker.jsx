import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { toPng } from "html-to-image";
import { Share2, Heart, Zap, FastForward } from "lucide-react";
import "./RunTracker.css";

const Track = () => {
  const gltf = useLoader(GLTFLoader, "/400m_track.c4d/scene.gltf");
  const ref = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.1;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.15;

  return (
    <primitive object={gltf.scene} ref={ref} scale={[scale, scale, scale]} />
  );
};

const InfoContainer = ({ icon: Icon, label, value }) => (
  <div className="info-container">
    <Icon className="info-icon" />
    <div className="info-content">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  </div>
);

const RunTracker = () => {
  const [miles, setMiles] = useState("");
  const [laps, setLaps] = useState(0);
  const componentRef = useRef(null);

  const handleMilesChange = (event) => {
    const inputMiles = event.target.value;
    setMiles(inputMiles);

    // Calculate laps based on miles (1 lap = 400m = 0.2485 miles)
    const calculatedLaps = Math.floor(inputMiles / 0.2485);
    setLaps(calculatedLaps);
  };

  const handleShare = async () => {
    if (componentRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(componentRef.current, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = "run-tracker-screenshot.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error sharing screenshot:", err);
    }
  };

  return (
    <div className="run-tracker" ref={componentRef}>
      <div className="track-container">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={<Html>Loading 3D model...</Html>}>
            <Track />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="lap-counter">
          <span className="lap-count">{laps}</span>
          <span className="lap-label">Laps</span>
        </div>
        <button className="share-button" onClick={handleShare}>
          <Share2 size={24} />
          Share
        </button>
      </div>
      <div className="miles-input">
        <label htmlFor="miles-ran">Miles Ran:</label>
        <input
          type="number"
          id="miles-ran"
          value={miles}
          onChange={handleMilesChange}
          step="0.01"
          min="0"
        />
      </div>
      <div className="info-grid">
        <InfoContainer icon={Heart} label="BPM" value="145" />
        <InfoContainer icon={FastForward} label="Cadence" value="180 spm" />
        <InfoContainer icon={Zap} label="Pace" value="7:30 /mi" />
        <InfoContainer icon={Heart} label="Zone Avg" value="Zone 3" />
      </div>
    </div>
  );
};

export default RunTracker;
