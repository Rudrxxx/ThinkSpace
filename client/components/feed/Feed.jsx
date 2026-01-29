"use client";

import React, { useEffect, useState } from "react";
import { Zap, Moon, Brain, Share2, X, Send, MoreHorizontal, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RedditPostCard = ({ post, onInteraction, onThoughtsClick }) => {
    const [sparks, setSparks] = useState(post.sparks || 0);
    const [dims, setDims] = useState(post.dims || 0);
    const [thoughts, setThoughts] = useState(post.thoughts || 0);
    const [userChoice, setUserChoice] = useState(null);

    const handleSpark = (e) => {
        e.stopPropagation();
        if (userChoice === 'spark') {
            setSparks(sparks - 1);
            setUserChoice(null);
        } else {
            if (userChoice === 'dim') {
                setDims(dims - 1);
            }
            setSparks(sparks + 1);
            setUserChoice('spark');
        }
    };

    const handleDim = (e) => {
        e.stopPropagation();
        if (userChoice === 'dim') {
            setDims(dims - 1);
            setUserChoice(null);
        } else {
            if (userChoice === 'spark') {
                setSparks(sparks - 1);
            }
            setDims(dims + 1);
            setUserChoice('dim');
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: 'ThinkSpace',
                text: post.content || post.caption,
                url: window.location.href
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group glass-panel rounded-2xl mb-6 border border-white/5 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg shadow-black/20"
        >
            <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-secondary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <img
                                src={post.user?.image || post.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user?.name || post.author || 'User')}&background=random`}
                                alt={post.user?.name || post.author || 'User'}
                                className="w-10 h-10 rounded-full border border-white/10 relative z-10"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm hover:text-primary transition-colors cursor-pointer">
                                    {(post.user?.name || post.author || 'user').split(' ').pop()}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-400 font-mono">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">
                                @{(post.user?.username || post.user?.name || 'user').replace(/\s/g, '').toLowerCase()}
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div onClick={onThoughtsClick} className="cursor-pointer group/content">
                    <h3 className="text-lg md:text-xl font-medium text-gray-100 mb-4 leading-relaxed group-hover/content:text-white transition-colors">
                        {post.content || post.caption}
                    </h3>

                    {post.image && (
                        <div className="mt-3 mb-4 rounded-xl overflow-hidden border border-white/5 bg-black/20 relative group/image">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                            <img src={post.image} alt="Post content" className="w-full h-auto max-h-[600px] object-contain" />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                    <button
                        onClick={handleSpark}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${userChoice === 'spark' ? 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/50' : 'hover:bg-white/5 text-gray-400 hover:text-yellow-400'}`}
                    >
                        <Zap size={20} className={userChoice === 'spark' ? "fill-yellow-400" : ""} />
                        <span className="font-bold">{sparks}</span>
                    </button>

                    <button
                        onClick={handleDim}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${userChoice === 'dim' ? 'bg-purple-900/40 text-purple-400 ring-1 ring-purple-500/50' : 'hover:bg-white/5 text-gray-400 hover:text-purple-400'}`}
                    >
                        <Moon size={20} className={userChoice === 'dim' ? "fill-purple-400" : ""} />
                        <span className="font-bold">{dims}</span>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onThoughtsClick(post); }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-primary ml-auto"
                    >
                        <MessageCircle size={20} />
                        <span className="font-bold">{thoughts}</span>
                    </button>

                    <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-green-400">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* Animated Bottom Border */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>
    );
};

export default function Feed({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts || []);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const updatePostStats = (postId, type, value) => {
        setPosts(prevPosts => prevPosts.map(p => {
            if (p._id === postId) {
                return { ...p, [type]: value };
            }
            return p;
        }));
    };

    const handleThoughtsClick = (post) => {
        setSelectedPost(post);
        setComments([
            { id: 1, user: "Amit", text: "This perspective is truly mind-expanding! 🚀", time: "2h" },
            { id: 2, user: "Priya", text: "Could you elaborate on the second point?", time: "1h" }
        ]);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                user: "You",
                text: newComment,
                time: "now"
            };
            setComments([...comments, comment]);
            setNewComment("");

            setPosts(prevPosts => prevPosts.map(p => {
                if (p._id === selectedPost._id) {
                    return { ...p, thoughts: (p.thoughts || 0) + 1 };
                }
                return p;
            }));

            setSelectedPost(prev => ({ ...prev, thoughts: (prev.thoughts || 0) + 1 }));
        }
    };

    return (
        <div className="flex-1 min-w-0 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pb-20"
            >
                {posts?.map((post, index) => (
                    <RedditPostCard
                        key={post._id}
                        post={post}
                        onInteraction={updatePostStats}
                        onThoughtsClick={handleThoughtsClick}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-[#0f172a] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-primary/10"
                        >
                            <div className="flex-1 bg-black/40 flex items-center justify-center p-4 min-h-[300px] md:min-h-0 relative overflow-hidden">
                                {selectedPost.image ? (
                                    <img src={selectedPost.image} alt="Post" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <Brain size={32} className="text-primary animate-pulse" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Deep Thought</h3>
                                        <p className="text-gray-400">{selectedPost.content}</p>
                                    </div>
                                )}

                                {/* Close button for mobile */}
                                <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full md:hidden text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="w-full md:w-[400px] flex flex-col border-l border-white/10 bg-[#0f172a]">
                                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={selectedPost.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPost.user?.name || 'User')}&background=random`} alt="User" className="w-8 h-8 rounded-full ring-2 ring-primary/20" />
                                        <div>
                                            <span className="font-bold text-white block text-sm">{(selectedPost.user?.name || selectedPost.author || 'user').split(' ').pop()}</span>
                                            <span className="text-xs text-gray-500">Original Poster</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedPost(null)} className="hidden md:block p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-4 border-b border-white/10 bg-white/5">
                                    <p className="text-sm text-gray-200 leading-relaxed max-h-32 overflow-y-auto scrollbar-hide">
                                        {selectedPost.content || selectedPost.caption}
                                    </p>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {comments.map(comment => (
                                        <div key={comment.id} className="flex gap-3 group">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user)}&background=random`} alt={comment.user} className="w-8 h-8 rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-sm text-white">{comment.user}</span>
                                                    <span className="text-xs text-gray-600">{comment.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-300">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t border-white/10 bg-black/20">
                                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5 focus-within:border-primary/50 focus-within:bg-black/40 transition-all">
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add to the discussion..."
                                            className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm placeholder-gray-500"
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                        />
                                        <button
                                            onClick={handleAddComment}
                                            disabled={!newComment.trim()}
                                            className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
