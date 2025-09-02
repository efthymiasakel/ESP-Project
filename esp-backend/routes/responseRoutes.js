import express from 'express';
import {
  createResponse,
  countParticipants,
  countParticipantsByExperiment,
  exportResponses,
  exportResponsesByExperiment
} from '../controllers/responseController.js';

const router = express.Router();

router.post('/', createResponse);

//  Global count (όλα τα experiments)
router.get('/participants', countParticipants);

// Count ανά experiment
router.get('/participants/:experimentId', countParticipantsByExperiment);

// CSV
router.get('/export', exportResponses);
router.get('/export/:experimentId', exportResponsesByExperiment);

export default router;



