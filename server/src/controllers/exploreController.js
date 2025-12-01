import Post from '../models/Post.js';
import Spark from '../models/Spark.js';

// Get content for the explore page
export const getExploreContent = async (req, res) => {
    try {
        // Fetch trending posts (e.g., most likes)
        const trendingPosts = await Post.find()
            .sort({ likes: -1 })
            .limit(5)
            .populate('user', 'name avatar');

        // Fetch recent sparks
        const recentSparks = await Spark.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name avatar');

        // Hardcoded categories for now (can be dynamic later)
        const categories = [
            { id: "digital-art", name: "Digital Art" },
            { id: "tech", name: "Technology" },
            { id: "design", name: "Design" },
            { id: "music", name: "Music" },
            { id: "photography", name: "Photography" },
        ];

        res.status(200).json({
            trendingPosts,
            recentSparks,
            categories
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to load explore content.", error: error.message });
    }
};
