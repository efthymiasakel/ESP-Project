import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RunExperiment = () => {
  const { id } = useParams(); // αν έχει id = κανονικό Run, αλλιώς Demo Run
  const [experiment, setExperiment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const url = id
      ? `http://localhost:5000/api/experiments/${id}`
      : `http://localhost:5000/api/experiments/latest`;

    axios
      .get(url)
      .then((res) => {
        setExperiment(res.data);
      })
      .catch((err) => {
        console.error("❌ Error loading experiment:", err);
      });
  }, [id]);

  if (!experiment) return <p>Loading experiment...</p>;
  if (submitted) return <h3> Thank you for your participation!</h3>;

  if (!started) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>{experiment.welcomeText || "Welcome!"}</h2>
        <p>{experiment.instructions || "Please follow the instructions."}</p>
        <button onClick={() => setStarted(true)}>Start Experiment</button>
      </div>
    );
  }

  const handleResponse = (rating) => {
    const currentSentence = experiment.stimuli[currentIndex];
    const newResponse = { sentence: currentSentence, response: rating };
    const updatedResponses = [...responses, newResponse];

    if (currentIndex + 1 < experiment.stimuli.length) {
      setResponses(updatedResponses);
      setCurrentIndex(currentIndex + 1);
    } else {
      if (!id) {
        // DEMO MODE → δεν αποθηκεύουμε τίποτα
        setSubmitted(true);
        return;
      }

      //  Κανονικό Run → αποθηκεύουμε
      const responseData = {
        experimentId: experiment._id,
        participantId: "guest-user", // backend το μετατρέπει σε ανώνυμο αριθμό στο CSV
        answers: updatedResponses,
      };

      axios
        .post("http://localhost:5000/api/responses", responseData)
        .then(() => {
          setSubmitted(true);
        })
        .catch((err) => {
          console.error("❌ Error submitting response:", err);
        });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>{experiment.stimuli[currentIndex]}</p>
      <div style={{ marginTop: "20px" }}>
        {[...Array(experiment.likertSize)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleResponse(i + 1)}
            style={{ margin: "5px" }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RunExperiment;

























