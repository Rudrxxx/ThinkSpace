import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Spark from './models/Spark.js';
import Post from './models/Post.js';
import User from './models/User.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing data (optional, be careful!)
        // await Spark.deleteMany({});
        // await Post.deleteMany({});

        // Create a dummy user if none exists
        let user = await User.findOne();
        if (!user) {
            user = await User.create({
                name: 'Creative Soul',
                email: 'demo@thinkspace.com',
                password: 'password123', // In real app, hash this!
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80'
            });
            console.log('Created demo user');
        }

        // Diverse Video URLs (Mixkit/Pexels)
        const videoUrls = [
            "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-womans-feet-splashing-in-the-pool-1261-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-white-cat-in-nature-4103-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dog-catching-a-ball-in-slow-motion-1279-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-red-foliage-in-a-forest-during-autumn-40078-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32807-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-1238-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-sun-setting-or-rising-over-palm-trees-1170-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-1186-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-dark-tunnel-2034-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-sky-over-a-city-40081-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-young-woman-skater-skating-down-the-road-40089-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-under-a-peripheral-road-at-night-40082-large.mp4"
        ];

        // Diverse Image URLs (Unsplash)
        const imageUrls = [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
            "https://images.unsplash.com/photo-1516726817505-f5ed8259b4fb?w=800&q=80",
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=800&q=80",
            "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
            "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?w=800&q=80",
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80",
            "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&q=80",
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
            "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&q=80"
        ];

        const sparks = [];
        for (let i = 0; i < 50; i++) {
            sparks.push({
                user: user._id,
                videoUrl: videoUrls[i % videoUrls.length],
                thumbnailUrl: imageUrls[i % imageUrls.length],
                description: `Spark #${i + 1} - Unique content for you! 🌟 #viral #trending`,
                views: Math.floor(Math.random() * 5000) + 100,
                tags: ['viral', 'trending', 'fun'],
                likes: [],
                comments: [],
                shares: Math.floor(Math.random() * 100)
            });
        }

        for (const spark of sparks) {
            await Spark.create(spark);
        }
        console.log('Seeded Sparks with diverse content');

        // Seed Posts with diverse images
        const posts = [];
        const categories = ['digital-art', 'tech', 'design', 'music', 'photography'];

        for (let i = 0; i < 50; i++) {
            posts.push({
                user: user._id,
                content: `This is a unique post #${i + 1} about ${categories[i % categories.length]}.`,
                likes: Math.floor(Math.random() * 200),
                category: categories[i % categories.length],
                image: imageUrls[(i + 5) % imageUrls.length] // Offset to use different images
            });
        }

        for (const post of posts) {
            await Post.create(post);
        }
        console.log('Seeded Posts with diverse content');

        console.log('✅ Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
