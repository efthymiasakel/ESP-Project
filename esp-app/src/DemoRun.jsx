import { useState } from "react";

const DemoRun = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //  stimuli μόνο για demo
  const demoStimuli = [
    "The student read the book.",
    "The student reads the books yesterday.",
    "The book was read by the student."
  ];

  const likertSize = 5;

  if (submitted) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}> Thank you for testing the demo!</h3>;
  }

  if (!started) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", maxWidth: "700px", margin: "auto" }}>
        <h2 style={{ marginBottom: "20px" }}>Welcome to the Demo Experiment!</h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
          You are asked to rate, on a scale from 1 to 5, how <b>acceptable</b> each sentence sounds to you.
          <br />
          <b>1</b> = completely unacceptable &nbsp;&nbsp; <b>5</b> = completely acceptable
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
          Use the intermediate values (2–4) according to your intuition.
        </p>
        <p style={{ fontSize: "16px", marginTop: "20px" }}>
          By clicking <b>Start Experiment</b>, you confirm that you have read the instructions and you consent to participate anonymously in this study.
        </p>
        <button
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
          onClick={() => setStarted(true)}
        >
          Start Experiment
        </button>
      </div>
    );
  }

  const handleResponse = (rating) => {
    const currentSentence = demoStimuli[currentIndex];
    const newResponse = { sentence: currentSentence, response: rating };
    const updated = [...responses, newResponse];

    if (currentIndex + 1 < demoStimuli.length) {
      setResponses(updated);
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Demo responses:", updated); // μόνο για debug
      setSubmitted(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>{demoStimuli[currentIndex]}</p>
      <div style={{ marginTop: "20px" }}>
        {[...Array(likertSize)].map((_, i) => (
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

export default DemoRun;
