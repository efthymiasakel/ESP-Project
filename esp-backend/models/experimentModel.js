import mongoose from "mongoose";

const experimentSchema = new mongoose.Schema(
  {
    title: String,
    stimuli: [String],
    likertSize: Number,
    welcomeText: String,      
    instructions: String,     
  },
  { timestamps: true }
);

const Experiment = mongoose.model("Experiment", experimentSchema);

export default Experiment;







