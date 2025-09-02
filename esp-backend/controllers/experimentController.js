import Experiment from "../models/experimentModel.js";

//  Δημιουργία νέου experiment
export const createExperiment = async (req, res) => {
  try {
    const newExperiment = new Experiment(req.body);
    const saved = await newExperiment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Παίρνουμε όλα τα experiments
export const getExperiments = async (req, res) => {
  try {
    const experiments = await Experiment.find();
    res.json(experiments);
  } catch (err) {
    console.error("❌ Error fetching experiments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Παίρνουμε το πιο πρόσφατο experiment
export const getLatestExperiment = async (req, res) => {
  try {
    const latest = await Experiment.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No experiment found" });
    }
    res.json(latest);
  } catch (err) {
    console.error("❌ Error fetching latest experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Παίρνουμε συγκεκριμένο experiment με id
export const getExperimentById = async (req, res) => {
  try {
    const exp = await Experiment.findById(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experiment not found" });
    }
    res.json(exp);
  } catch (err) {
    console.error("❌ Error fetching experiment by id:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Ενημέρωση experiment
export const updateExperiment = async (req, res) => {
  try {
    const updated = await Experiment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Experiment not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Διαγραφή συγκεκριμένου experiment
export const deleteExperiment = async (req, res) => {
  try {
    const deleted = await Experiment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Experiment not found" });
    }
    res.json({ message: "🗑️ Experiment deleted" });
  } catch (err) {
    console.error("❌ Error deleting experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Διαγραφή όλων (μόνο για δοκιμές!)
export const deleteAllExperiments = async (req, res) => {
  try {
    await Experiment.deleteMany({});
    res.json({ message: "🗑️ All experiments deleted" });
  } catch (err) {
    console.error("❌ Error deleting experiments:", err);
    res.status(500).json({ message: "Server error" });
  }
};




















