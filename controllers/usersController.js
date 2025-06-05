import User from '../models/user.js';
import Link from '../models/link.js';
import mongoose from 'mongoose';

// Get all users
export const getUsers = async (req, res) => {
    const users = await User.find().populate('links');
    res.json(users);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(id).populate('links');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
};
// Create new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, links: [] });
    await user.save();
    res.status(201).json(user);
};

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.json(user);
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};

// Add link to user
export const addLinkToUser = async (req, res) => {
    const { userId } = req.params;
    const { originalUrl } = req.body;
    const link = new Link({ originalUrl });
    await link.save();
    const user = await User.findByIdAndUpdate(userId, { $push: { links: link._id } }, { new: true }).populate('links');
    res.status(201).json(user);
};
