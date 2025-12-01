import mongoose from 'mongoose';

const sparkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    description: {
        type: String,
        maxLength: 280
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    shares: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }]
}, { timestamps: true });

export default mongoose.model('Spark', sparkSchema);
