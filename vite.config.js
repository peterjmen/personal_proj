import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://riddle-app.azurewebsites.net";

const App = () => {
  const [yourAge, setYourAge] = useState("");
  const [theirAge, setTheirAge] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    if (Math.abs(Number(yourAge) - Number(theirAge)) < 2) {
      setError("The ages must be at least 2 years apart.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/Ridde-Of-The-Ages/${yourAge}/${theirAge}`
      );
      console.log("API Response:", response); // Log the full response
      setResult(response.data);
    } catch (error) {
      console.error("Error details:", error.response || error); // Log detailed error info
      setError(
        "An error occurred while fetching the riddle. Please check the console for more details."
      );
    }
  };

  return (
    <div className="App">
      <h1>Riddle of Ages</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="yourAge">Your Age: </label>
          <input
            type="number"
            id="yourAge"
            value={yourAge}
            onChange={(e) => setYourAge(e.target.value)}
            required
            min="1"
            max="1000"
          />
        </div>
        <div>
          <label htmlFor="theirAge">Their Age: </label>
          <input
            type="number"
            id="theirAge"
            value={theirAge}
            onChange={(e) => setTheirAge(e.target.value)}
            required
            min="1"
            max="1000"
          />
        </div>
        <button type="submit">Get Riddle</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h2>Riddle:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
