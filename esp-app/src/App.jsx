import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import CreateExperiment from "./CreateExperiment";
import RunExperiment from "./RunExperiment";
import Dashboard from "./Dashboard";
import EditExperiment from "./EditExperiment";
import DemoRun from "./DemoRun"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div
          style={{ padding: "40px", display: "flex", justifyContent: "center" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateExperiment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:id" element={<EditExperiment />} />

            {/* Demo Run */}
            <Route path="/run" element={<DemoRun />} />

            {/* Real Run */}
            <Route path="/run/:id" element={<RunExperiment />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;










