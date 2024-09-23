import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./RunTracker.css";

const RunTracker = () => {
  const [recentRun, setRecentRun] = useState({
    dailyWater: 72,
    weeklyDistance: 21,
  });

  const [previousRuns, setPreviousRuns] = useState([]);
  const [isEditingWater, setIsEditingWater] = useState(false);
  const [isEditingDistance, setIsEditingDistance] = useState(false);
  const [dailyWaterInput, setDailyWaterInput] = useState(recentRun.dailyWater);
  const [weeklyDistanceInput, setWeeklyDistanceInput] = useState(
    recentRun.weeklyDistance,
  );

  const [newRun, setNewRun] = useState({
    date: "",
    name: "",
    time: "",
    temp: "",
    distance: "",
    bpm: "",
  });

  const handleWaterIntakeChange = (event) => {
    setDailyWaterInput(event.target.value);
  };

  const handleWeeklyDistanceChange = (event) => {
    setWeeklyDistanceInput(event.target.value);
  };

  const handleNewRunChange = (event) => {
    const { name, value } = event.target;
    setNewRun({ ...newRun, [name]: value });
  };

  const toggleEditModeWater = () => {
    if (isEditingWater) {
      setRecentRun({ ...recentRun, dailyWater: dailyWaterInput });
    }
    setIsEditingWater(!isEditingWater);
  };

  const toggleEditModeDistance = () => {
    if (isEditingDistance) {
      setRecentRun({ ...recentRun, weeklyDistance: weeklyDistanceInput });
    }
    setIsEditingDistance(!isEditingDistance);
  };

  const addNewRun = () => {
    setPreviousRuns([...previousRuns, newRun]);
    setNewRun({
      date: "",
      name: "",
      time: "",
      temp: "",
      distance: "",
      bpm: "",
    });
  };

  return (
    <div className="run-tracker">
      <h1>Recent Run</h1>
      <div className="recent-run-details">
        <div className="detail">
          <h2>
            Daily Water
            <FaPencilAlt className="edit-icon" onClick={toggleEditModeWater} />
          </h2>
          {isEditingWater ? (
            <div className="edit-mode scribble">
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={dailyWaterInput}
                onChange={handleWaterIntakeChange}
              />
              <input
                type="number"
                value={dailyWaterInput}
                onChange={handleWaterIntakeChange}
              />
            </div>
          ) : (
            <p>{recentRun.dailyWater} oz</p>
          )}
        </div>
        <div className="detail">
          <h2>
            Weekly Distance
            <FaPencilAlt
              className="edit-icon"
              onClick={toggleEditModeDistance}
            />
          </h2>
          {isEditingDistance ? (
            <div className="edit-mode scribble">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={weeklyDistanceInput}
                onChange={handleWeeklyDistanceChange}
              />
              <input
                type="number"
                value={weeklyDistanceInput}
                onChange={handleWeeklyDistanceChange}
              />
            </div>
          ) : (
            <p>{recentRun.weeklyDistance} miles</p>
          )}
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
            <tr key={index} className="scribble">
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
      <h2>Add New Run</h2>
      <div className="new-run-form">
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={newRun.date}
          onChange={handleNewRunChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newRun.name}
          onChange={handleNewRunChange}
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={newRun.time}
          onChange={handleNewRunChange}
        />
        <input
          type="text"
          name="temp"
          placeholder="Temp"
          value={newRun.temp}
          onChange={handleNewRunChange}
        />
        <input
          type="text"
          name="distance"
          placeholder="Distance"
          value={newRun.distance}
          onChange={handleNewRunChange}
        />
        <input
          type="text"
          name="bpm"
          placeholder="BPM"
          value={newRun.bpm}
          onChange={handleNewRunChange}
        />
        <button onClick={addNewRun}>Add Run</button>
      </div>
    </div>
  );
};

export default RunTracker;
