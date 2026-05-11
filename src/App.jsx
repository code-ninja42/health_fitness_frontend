import { useState } from "react";
import "./App.css";

const API_URL = "https://health-fitness-backend-vryw.onrender.com/predict";

function App() {
  const [exercise, setExercise] = useState("");
  const [steps, setSteps] = useState("");
  const [food, setFood] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [result, setResult] = useState("");

  const predictWeight = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise_minutes: Number(exercise),
          steps: Number(steps),
          food_calories: Number(food),
          sleep_hours: Number(sleep),
          water_intake_liters: Number(water),
        }),
      });

      const data = await response.json();

      setResult(
        "Predicted Weight: " +
          Number(data.predicted_weight).toFixed(2) +
          " kg"
      );
    } catch (error) {
      setResult("Server Error");
    }
  };

  return (
    <div className="container">
      <h1>Health Fitness Predictor</h1>

      <div className="card">
        <input
          type="number"
          placeholder="Exercise Minutes"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />

        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <input
          type="number"
          placeholder="Food Calories"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />

        <input
          type="number"
          placeholder="Sleep Hours"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />

        <input
          type="number"
          placeholder="Water Intake Liters"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        />

        <button onClick={predictWeight}>
          Predict Weight
        </button>

        <h2>{result}</h2>
      </div>
    </div>
  );
}

export default App;