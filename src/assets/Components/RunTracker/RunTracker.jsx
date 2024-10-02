import { useState, useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { toPng } from "html-to-image";
import { Share2, Heart, Zap, FastForward } from "lucide-react";
import "./RunTracker.css";

const InfoContainer = ({ icon: Icon, label, value }) => (
  <div className="info-container">
    <Icon className="info-icon" size={24} />
    <div className="info-content">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  </div>
);

const Track = () => {
  const gltf = useLoader(GLTFLoader, "/400m_track.c4d/scene.gltf");
  return <primitive object={gltf.scene} scale={[0.01, 0.01, 0.01]} />;
};

const RunTracker = () => {
  const [miles, setMiles] = useState("");
  const [laps, setLaps] = useState(0);
  const componentRef = useRef(null);

  const handleMilesChange = (event) => {
    const inputMiles = event.target.value;
    setMiles(inputMiles);
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
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Track />
          </Suspense>
          <OrbitControls />
        </Canvas>
        <div className="lap-counter">
          <span className="lap-count">{laps}</span>
          <span className="lap-label">Laps</span>
        </div>
        <button className="share-button" onClick={handleShare}>
          <Share2 size={18} />
          <span>Share</span>
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
