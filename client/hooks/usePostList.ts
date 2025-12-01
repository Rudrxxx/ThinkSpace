import { useState } from "react";

export const usePostList = (initialPosts: any[]) => {
    const [posts, setPosts] = useState(initialPosts);
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const updatePostStats = (postId: string | number, type: string, value: number) => {
        setPosts(prevPosts => prevPosts.map(p => {
            // Handle both string and number IDs
            if (p._id === postId || p.id === postId) {
                // Handle both flat stats and nested stats object
                if (p.stats) {
                    return { ...p, stats: { ...p.stats, [type]: value } };
                }
                return { ...p, [type]: value };
            }
            return p;
        }));

        if (selectedPost && (selectedPost._id === postId || selectedPost.id === postId)) {
            setSelectedPost((prev: any) => {
                if (prev.stats) {
                    return { ...prev, stats: { ...prev.stats, [type]: value } };
                }
                return { ...prev, [type]: value };
            });
        }
    };

    const incrementThoughts = (postId: string | number) => {
        setPosts(prevPosts => prevPosts.map(p => {
            if (p._id === postId || p.id === postId) {
                if (p.stats) {
                    return { ...p, stats: { ...p.stats, thoughts: (p.stats.thoughts || 0) + 1 } };
                }
                return { ...p, thoughts: (p.thoughts || 0) + 1 };
            }
            return p;
        }));

        if (selectedPost && (selectedPost._id === postId || selectedPost.id === postId)) {
            setSelectedPost((prev: any) => {
                if (prev.stats) {
                    return { ...prev, stats: { ...prev.stats, thoughts: (prev.stats.thoughts || 0) + 1 } };
                }
                return { ...prev, thoughts: (prev.thoughts || 0) + 1 };
            });
        }
    };

    return { posts, setPosts, selectedPost, setSelectedPost, updatePostStats, incrementThoughts };
};
