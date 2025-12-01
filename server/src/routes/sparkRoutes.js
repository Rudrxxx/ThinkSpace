import express from 'express';
import { getSparks, createSpark, likeSpark, addComment, shareSpark } from '../controllers/sparkController.js';
import { protect } from '../controllers/authController.js'; // Assuming auth middleware exists

const router = express.Router();

router.get('/', getSparks);
router.post('/', protect, createSpark);
router.put('/like/:id', protect, likeSpark);
router.post('/comment/:id', protect, addComment);
router.post('/share/:id', shareSpark);

export default router;
