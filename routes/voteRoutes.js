import express from 'express';
import { vote, getVoteCounts } from '../controllers/voteController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', protect, authorize("voter"), vote);

router.get('/results', protect, authorize('admin'), getVoteCounts);

export default router;
