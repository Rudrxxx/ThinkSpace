import Spark from '../models/Spark.js';

// Get all sparks (with pagination support)
export const getSparks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const sparks = await Spark.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name avatar'); // Assuming User model has name and avatar

        res.status(200).json(sparks);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching sparks.", error: error.message });
    }
};

// Create a new spark
export const createSpark = async (req, res) => {
    try {
        const { videoUrl, description, tags } = req.body;

        if (!videoUrl) {
            return res.status(400).json({ message: "Video URL is required." });
        }

        const newSpark = new Spark({
            user: req.user.id, // Assuming auth middleware adds user to req
            videoUrl,
            description,
            tags
        });

        await newSpark.save();

        res.status(201).json(newSpark);
    } catch (error) {
        res.status(500).json({ message: "Failed to create spark.", error: error.message });
    }
};

// Like a spark
export const likeSpark = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const spark = await Spark.findById(id);

        if (!spark) {
            return res.status(404).json({ message: "Spark not found." });
        }

        const index = spark.likes.findIndex((id) => id === String(userId));

        if (index === -1) {
            spark.likes.push(userId);
        } else {
            spark.likes = spark.likes.filter((id) => id !== String(userId));
        }

        await spark.save();

        res.status(200).json(spark);
    } catch (error) {
        res.status(500).json({ message: "Could not like spark.", error: error.message });
    }
};

// Add a comment
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const spark = await Spark.findById(id);
        if (!spark) return res.status(404).json({ message: "Spark not found" });

        const newComment = {
            user: userId,
            text,
            createdAt: new Date()
        };

        spark.comments.push(newComment);
        await spark.save();

        // Populate user details for the new comment to return it
        const populatedSpark = await Spark.findById(id).populate('comments.user', 'name avatar');
        const addedComment = populatedSpark.comments[populatedSpark.comments.length - 1];

        res.status(201).json(addedComment);
    } catch (error) {
        res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
};

// Share a spark (increment share count)
export const shareSpark = async (req, res) => {
    try {
        const { id } = req.params;
        const spark = await Spark.findByIdAndUpdate(id, { $inc: { shares: 1 } }, { new: true });
        res.status(200).json({ shares: spark.shares });
    } catch (error) {
        res.status(500).json({ message: "Failed to share spark", error: error.message });
    }
};
