import express from 'express';
import { addCandidate, getCandidates } from '../controllers/candidateController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();
router.post('/add', protect, authorize('admin'), isAdmin,upload.single('image'), addCandidate);
router.get('/', getCandidates);
export default router;

// import express from 'express';
// import { addCandidate } from '../controllers/candidates.js';


// const router = express.Router();

// // POST /api/candidates
// router.post('/', protect, authorize, isAdmin, upload.single('image'), addCandidate);
// router.get('/', getCandidates);
// export default router;
