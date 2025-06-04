import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, addLinkToUser, getUserById } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Add link to user
router.post('/:userId/links', addLinkToUser);

export default router;
