"use client";

import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Share2 } from "lucide-react";
import InteractionBar from "@/components/ui/InteractionBar";
import PostDetailModal from "@/components/profile/PostDetailModal";

interface PostProps {
    post: any;
    onThoughtsClick: (post: any) => void;
    onInteraction?: (type: string, value: number) => void;
}

const ThoughtCard = ({ post, onThoughtsClick, onInteraction }: PostProps) => (
    <GlassCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
            <img src={post.user.image} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                <p className="text-xs text-slate-500">2h ago</p>
            </div>
        </div>
        <p className="text-lg text-slate-700 leading-relaxed mb-4 font-serif">
            {post.content}
        </p>
        <InteractionBar
            initialCounts={{ spark: post.likes, dim: post.dim || 0, thoughts: post.thoughts || 0, spread: post.spread || 0 }}
            onThoughtsClick={() => onThoughtsClick(post)}
            onInteraction={onInteraction}
        />
    </GlassCard>
);

const VisualCard = ({ post, onThoughtsClick, onInteraction }: PostProps) => (
    <GlassCard className="mb-6 p-0 overflow-hidden">
        <div className="p-4 flex items-center gap-3">
            <img src={post.user.image} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                <p className="text-xs text-slate-500">4h ago</p>
            </div>
        </div>
        <div className="relative w-full aspect-[4/3] bg-slate-100">
            <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
            <p className="text-slate-700 mb-4">{post.caption}</p>
            <InteractionBar
                initialCounts={{ spark: post.likes, dim: post.dim || 0, thoughts: post.thoughts || 0, spread: post.spread || 0 }}
                onThoughtsClick={() => onThoughtsClick(post)}
                onInteraction={onInteraction}
            />
        </div>
    </GlassCard>
);

const Feed = ({ posts: initialPosts }: { posts: any[] }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const handleCommentAdd = () => {
        if (!selectedPost) return;

        // Update local posts state
        setPosts(prevPosts => prevPosts.map(p => {
            if (p._id === selectedPost._id) {
                return {
                    ...p,
                    thoughts: (p.thoughts || 0) + 1
                };
            }
            return p;
        }));

        // Update selectedPost state to reflect change immediately in modal if needed (though modal uses its own comments list, the parent needs to know for the count)
        setSelectedPost((prev: any) => ({
            ...prev,
            thoughts: (prev.thoughts || 0) + 1
        }));
    };

    const handleInteraction = (postId: string, type: string, value: number) => {
        setPosts(prevPosts => prevPosts.map(p => {
            if (p._id === postId) {
                return {
                    ...p,
                    [type]: value // For Feed posts, stats are top-level properties like 'likes', 'dim'
                };
            }
            return p;
        }));

        if (selectedPost && selectedPost._id === postId) {
            setSelectedPost((prev: any) => ({
                ...prev,
                [type]: value
            }));
        }
    };

    return (
        <div className="max-w-xl mx-auto pb-20">
            {posts.map((post) => (
                <React.Fragment key={post._id}>
                    {post.type === 'thought' ?
                        <ThoughtCard
                            post={post}
                            onThoughtsClick={setSelectedPost}
                            onInteraction={(type, value) => handleInteraction(post._id, type === 'spark' ? 'likes' : type, value)}
                        /> :
                        <VisualCard
                            post={post}
                            onThoughtsClick={setSelectedPost}
                            onInteraction={(type, value) => handleInteraction(post._id, type === 'spark' ? 'likes' : type, value)}
                        />
                    }
                </React.Fragment>
            ))}

            <PostDetailModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                onCommentAdd={handleCommentAdd}
                onInteraction={(type, value) => selectedPost && handleInteraction(selectedPost._id, type === 'spark' ? 'likes' : type, value)}
            />
        </div>
    );
};

export default Feed;
