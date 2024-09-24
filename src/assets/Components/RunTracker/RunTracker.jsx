import { useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import html2canvas from "html2canvas";
import "./RunTracker.css";

const TrackModel = () => {
  const { scene } = useLoader(
    ColladaLoader,
    "/src/assets/running+track/model.dae",
  );
  return <primitive object={scene} />;
};

const RunTracker = () => {
  const [laps, setLaps] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [cadence, setCadence] = useState(0);
  const [pace, setPace] = useState(0);
  const [zoneAvg, setZoneAvg] = useState(0);

  const handleShare = () => {
    html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.download = "run-tracker.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="run-tracker">
      <div className="track-layout">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <TrackModel />
            <OrbitControls />
          </Suspense>
        </Canvas>
        <div className="counter">Laps: {laps}</div>
        <button className="share-button" onClick={handleShare}>
          Share
        </button>
      </div>
      <div className="info-container">
        <div className="info-box">
          <h3>BPM</h3>
          <p>{bpm}</p>
        </div>
        <div className="info-box">
          <h3>Cadence</h3>
          <p>{cadence}</p>
        </div>
        <div className="info-box">
          <h3>Pace</h3>
          <p>{pace}</p>
        </div>
        <div className="info-box">
          <h3>Zone Avg</h3>
          <p>{zoneAvg}</p>
        </div>
      </div>
    </div>
  );
};

export default RunTracker;
