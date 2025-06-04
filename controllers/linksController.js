import Link from '../models/link.js';

// Get all links
export const getLinks = async (req, res) => {
    const links = await Link.find();
    res.json(links);
};

// Create new link
export const createLink = async (req, res) => {
    const { originalUrl } = req.body;
    const link = new Link({ originalUrl });
    await link.save();
    res.status(201).json(link);
};

// Update link
export const updateLink = async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;
    const link = await Link.findByIdAndUpdate(id, { originalUrl }, { new: true });
    res.json(link);
};

// Delete link
export const deleteLink = async (req, res) => {
    const { id } = req.params;
    await Link.findByIdAndDelete(id);
    res.status(204).send();
};

// Redirect and track click
export const getLinkById = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(404).send('Link not found');
    res.json(link);
};

export const clicksByTarget = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ error: 'Link not found' });
    // פילוח לפי targetParamValue
    const summary = {};
    link.clicks.forEach(click => {
        const val = click.targetParamValue || '';
        summary[val] = (summary[val] || 0) + 1;
    });
    res.json(summary);
};

export const redirectLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
        return res.status(404).send('Link not found');
    }
    // Get IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // Target param logic
    const targetParamName = link.targetParamName || 't';
    const targetParamValue = req.query[targetParamName] || '';
    // Prevent duplicate clicks from same IP (optional)
    const alreadyClicked = link.clicks.some(click => click.ipAddress === ip);
    if (!alreadyClicked) {
        link.clicks.push({ insertedAt: new Date(), ipAddress: ip, targetParamValue });
        await link.save();
    }
    // Redirect
    res.redirect(link.originalUrl);
};
