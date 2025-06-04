import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    clicks: [
        {
            insertedAt: { type: Date, default: Date.now },
            ipAddress: { type: String },
            targetParamValue: { type: String, default: '' }
        }
    ],
    targetParamName: { type: String, default: 't' },
    targetValues: [
        {
            name: { type: String },
            value: { type: String }
        }
    ]
});

const Link = mongoose.model('Link', linkSchema);
export default Link;
