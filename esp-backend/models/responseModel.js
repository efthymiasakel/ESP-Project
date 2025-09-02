import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    experimentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experiment",
      required: true,
    },
    participantId: {
      type: String, 
      required: true,
    },
    answers: [
      {
        sentence: String,
        response: Number, // αντί για rating -> response
      },
    ],
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;



