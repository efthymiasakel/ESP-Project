import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [experiments, setExperiments] = useState([]);
  const [participantCounts, setParticipantCounts] = useState({});

  const baseUrl = window.location.origin;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/experiments")
      .then((res) => {
        setExperiments(res.data);
        res.data.forEach((exp) => {
          fetchCount(exp._id);
        });
      })
      .catch((err) => console.error("Failed to fetch experiments:", err));

    const interval = setInterval(() => {
      experiments.forEach((exp) => {
        fetchCount(exp._id);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchCount = (id) => {
    axios
      .get(`http://localhost:5000/api/responses/participants/${id}`)
      .then((res) => {
        setParticipantCounts((prev) => ({
          ...prev,
          [id]: res.data.count,
        }));
      })
      .catch((err) => console.error("Failed to fetch participants:", err));
  };

  const handleExportOne = (id) => {
    window.open(`http://localhost:5000/api/responses/export/${id}`, "_blank");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("❌ Are you sure you want to delete this experiment?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/experiments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑️ Experiment deleted!");
        setExperiments((prev) => prev.filter((exp) => exp._id !== id));
      } else {
        alert("❌ Failed to delete experiment");
      }
    } catch (err) {
      console.error("❌ Error deleting experiment:", err);
    }
  };

  const handleCopyLink = (id) => {
    const link = `${baseUrl}/run/${id}`;
    navigator.clipboard.writeText(link);
    alert("🔗 Link copied: " + link);
  };

  return (
    <div className="dashboard">
      <h1> Dashboard</h1>
      <p>Here you can see live participation and manage your experiments.</p>

      <hr style={{ margin: "30px 0" }} />

      {experiments.map((exp) => (
        <div key={exp._id} className="card">
          <h2>{exp.title}</h2>
          <h3>Participants: {participantCounts[exp._id] || 0}</h3>

          <div className="toolbar">
            <button
              onClick={() => handleExportOne(exp._id)}
              className="btn btn-primary"
            >
              📥 Export CSV
            </button>

            <Link to={`/edit/${exp._id}`}>
              <button className="btn btn-secondary">✏️ Edit</button>
            </Link>

            <button
              onClick={() => handleCopyLink(exp._id)}
              className="btn btn-secondary"
            >
              🔗 Copy Link
            </button>

            <button
              onClick={() => handleDelete(exp._id)}
              className="btn btn-danger"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;


















