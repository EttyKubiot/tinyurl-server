import express from 'express';
import { getLinks, createLink, updateLink, deleteLink, redirectLink, getLinkById } from '../controllers/linksController.js';

const router = express.Router();

router.get('/', getLinks);
router.get('/:id', getLinkById);
router.get('/:id/clicks-by-target', clicksByTarget);
router.post('/', createLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

// Redirect and track click
router.get('/:id/redirect', redirectLink);

export default router;
