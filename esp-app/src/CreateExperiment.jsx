import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateExperiment() {
  const [title, setTitle] = useState("");
  const [likertSize, setLikertSize] = useState(5);
  const [stimuli, setStimuli] = useState([""]);
  const [welcomeText, setWelcomeText] = useState("");       
  const [instructions, setInstructions] = useState("");     

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStimulusChange = (index, value) => {
    const newStimuli = [...stimuli];
    newStimuli[index] = value;
    setStimuli(newStimuli);
  };

  const addStimulus = () => {
    setStimuli([...stimuli, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/experiments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          likertSize,
          stimuli,
          welcomeText,
          instructions,
          userId: user.uid,
        }),
      });

      const data = await res.json();
      console.log("📦 Experiment saved:", data);
      alert("✅ Experiment saved!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error saving experiment:", error);
      alert("Failed to save experiment");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Create a New Experiment</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <input
          type="text"
          placeholder="Experiment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Welcome message"
          value={welcomeText}
          onChange={(e) => setWelcomeText(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <br /><br />

        <textarea
          placeholder="Instructions for participants"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <br /><br />

        <label>
          Likert Scale Size:
          <select
            value={likertSize}
            onChange={(e) => setLikertSize(Number(e.target.value))}
          >
            <option value={5}>1–5</option>
            <option value={6}>1–6</option>
            <option value={7}>1–7</option>
          </select>
        </label>
        <br /><br />

        <h4>Stimuli:</h4>
        {stimuli.map((stimulus, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Stimulus #${index + 1}`}
              value={stimulus}
              onChange={(e) => handleStimulusChange(index, e.target.value)}
              required
            />
            <br /><br />
          </div>
        ))}

        <button type="button" onClick={addStimulus}>
          + Add Sentence
        </button>
        <br /><br />
        <button type="submit">Save Experiment</button>
      </form>
    </div>
  );
}

export default CreateExperiment;






