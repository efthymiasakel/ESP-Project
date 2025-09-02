import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditExperiment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [likertSize, setLikertSize] = useState(5);
  const [stimuli, setStimuli] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/experiments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setWelcomeText(data.welcomeText || "");
        setInstructions(data.instructions || "");
        setLikertSize(data.likertSize);
        setStimuli(data.stimuli.length > 0 ? data.stimuli : [""]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading experiment:", err);
        setLoading(false);
      });
  }, [id]);

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

    try {
      const res = await fetch(`http://localhost:5000/api/experiments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          welcomeText,
          instructions,
          likertSize,
          stimuli,
        }),
      });

      if (res.ok) {
        alert(" Experiment updated!");
        navigate("/dashboard");
      } else {
        alert("❌ Failed to update experiment");
      }
    } catch (error) {
      console.error("❌ Error updating experiment:", error);
      alert("Failed to update experiment");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Edit Experiment</h2>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditExperiment;

