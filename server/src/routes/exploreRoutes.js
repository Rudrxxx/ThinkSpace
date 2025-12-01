import express from 'express';
import { getExploreContent } from '../controllers/exploreController.js';

const router = express.Router();

router.get('/', getExploreContent);

export default router;
