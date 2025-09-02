import express from "express";
import {
  createExperiment,
  getExperiments,
  getLatestExperiment,
  getExperimentById,
  updateExperiment,
  deleteExperiment,
  deleteAllExperiments,
} from "../controllers/experimentController.js";

const router = express.Router();

// Δημιουργία
router.post("/", createExperiment);

// Όλα
router.get("/", getExperiments);

// Τελευταίο
router.get("/latest", getLatestExperiment);

// Συγκεκριμένο id
router.get("/:id", getExperimentById);

// Ενημέρωση
router.put("/:id", updateExperiment);

// Διαγραφή ενός
router.delete("/:id", deleteExperiment);

// Διαγραφή όλων (μόνο για δοκιμές!)
router.delete("/", deleteAllExperiments);

export default router;








