import React, { useState } from "react";
import "./RunTracker.css";

const RunTracker = () => {
  const [recentRun, setRecentRun] = useState({
    dailyWater: 72,
    weeklyDistance: 21,
  });

  const [previousRuns, setPreviousRuns] = useState([]);

  return (
    <div className="run-tracker">
      <h1>Recent Run</h1>
      <div className="recent-run-details">
        <div className="detail">
          <h2>Daily Water</h2>
          <p>{recentRun.dailyWater} oz</p>
        </div>
        <div className="detail">
          <h2>Weekly Distance</h2>
          <p>{recentRun.weeklyDistance} miles</p>
        </div>
      </div>
      <h2>Previous Runs</h2>
      <table className="previous-runs">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Time</th>
            <th>Temp</th>
            <th>Distance</th>
            <th>BPM</th>
          </tr>
        </thead>
        <tbody>
          {previousRuns.map((run, index) => (
            <tr key={index}>
              <td>{run.date}</td>
              <td>{run.name}</td>
              <td>{run.time}</td>
              <td>{run.temp}</td>
              <td>{run.distance}</td>
              <td>{run.bpm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RunTracker;
