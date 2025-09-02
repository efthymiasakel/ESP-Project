import Response from '../models/responseModel.js';
import { Parser } from 'json2csv';

// Δημιουργία απάντησης
export const createResponse = async (req, res) => {
  try {
    const newResponse = new Response(req.body);
    const saved = await newResponse.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving response:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Μετράει συνολικούς μοναδικούς συμμετέχοντες (όλα τα experiments)
export const countParticipants = async (req, res) => {
  try {
    const uniqueParticipants = await Response.distinct('participantId');
    res.json({ count: uniqueParticipants.length });
  } catch (err) {
    console.error("❌ Error counting participants:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Μετράει μοναδικούς συμμετέχοντες για συγκεκριμένο experiment
export const countParticipantsByExperiment = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const uniqueParticipants = await Response.distinct('participantId', { experimentId });
    res.json({ count: uniqueParticipants.length });
  } catch (err) {
    console.error("❌ Error counting participants by experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Helper: mapping participantId -> continuous numbers
const mapParticipantsToNumbers = (responses) => {
  const uniqueIds = [...new Set(responses.map(r => r.participantId))];
  const idMap = new Map();
  uniqueIds.forEach((id, index) => {
    idMap.set(id, index + 1); // ξεκινάει από 1
  });
  return idMap;
};

//  Export CSV για όλα τα experiments (flattened + continuous IDs)
export const exportResponses = async (req, res) => {
  try {
    const responses = await Response.find();

    if (responses.length === 0) {
      return res.status(404).json({ message: "No responses found" });
    }

    const idMap = mapParticipantsToNumbers(responses);

    const flattened = responses.flatMap(r =>
      r.answers.map(a => ({
        experimentId: r.experimentId,
        participantId: idMap.get(r.participantId),
        sentence: a.sentence,
        response: a.response ?? a.rating
      }))
    );

    const fields = ['experimentId', 'participantId', 'sentence', 'response'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(flattened);

    res.header('Content-Type', 'text/csv');
    res.attachment('responses_all.csv');
    return res.send(csv);
  } catch (err) {
    console.error("❌ Error exporting CSV:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Export CSV για συγκεκριμένο experiment (flattened + continuous IDs)
export const exportResponsesByExperiment = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const responses = await Response.find({ experimentId });

    if (responses.length === 0) {
      return res.status(404).json({ message: "No responses found for this experiment" });
    }

    const idMap = mapParticipantsToNumbers(responses);

    const flattened = responses.flatMap(r =>
      r.answers.map(a => ({
        experimentId: r.experimentId,
        participantId: idMap.get(r.participantId),
        sentence: a.sentence,
        response: a.response ?? a.rating
      }))
    );

    const fields = ['experimentId', 'participantId', 'sentence', 'response'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(flattened);

    res.header('Content-Type', 'text/csv');
    res.attachment(`responses_${experimentId}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error("❌ Error exporting CSV by experiment:", err);
    res.status(500).json({ message: "Server error" });
  }
};










