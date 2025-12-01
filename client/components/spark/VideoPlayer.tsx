
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Music2, Play, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SparkProps {
    _id: string;
    videoUrl: string;
    thumbnailUrl?: string;
    user: {
        name: string;
        avatar?: string;
    };
    description: string;
    likes: string[];
    comments?: any[];
    shares?: number;
    views: number;
}

const VideoCard = ({ spark, isActive }: { spark: SparkProps; isActive: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(spark.likes?.length || 0);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(spark.comments || []);
    const [shareCount, setShareCount] = useState(spark.shares || 0);

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(() => { });
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
            setShowComments(false); // Close comments when scrolling away
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setShareCount(prev => prev + 1);
        // Simulate copy to clipboard
        navigator.clipboard.writeText(`Check out this spark! ${window.location.origin}/sparks/${spark._id}`);
        alert("Link copied to clipboard!");
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: { name: "You", avatar: "https://ui-avatars.com/api/?name=You&background=random" },
            text: commentText,
            createdAt: new Date().toISOString()
        };

        setComments([...comments, newComment]);
        setCommentText("");
    };

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-black overflow-hidden">
            {/* Video Background Blur (Optional for non-vertical videos) */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30"
                style={{ backgroundImage: `url(${spark.thumbnailUrl || spark.videoUrl})` }}
            />

            <video
                ref={videoRef}
                src={spark.videoUrl}
                poster={spark.thumbnailUrl}
                className="h-full w-full md:w-auto md:max-w-md object-cover relative z-10"
                loop
                muted={false} // Allow sound if user interacts, but usually starts muted or requires interaction
                playsInline
                onClick={togglePlay}
            />

            {/* Play/Pause Overlay */}
            <AnimatePresence>
                {!isPlaying && !showComments && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm">
                            <Play className="w-12 h-12 text-white fill-white" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Overlay */}
            <div className={`absolute inset - 0 z - 30 bg - gradient - to - b from - black / 20 via - transparent to - black / 90 flex flex - col justify - end p - 6 md: p - 8 transition - opacity duration - 300 ${showComments ? 'opacity-0 pointer-events-none' : 'opacity-100'} `}>
                <div className="flex items-end justify-between max-w-2xl mx-auto w-full pointer-events-auto">
                    <div className="mb-12 md:mb-8 text-white flex-1 mr-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                                <img
                                    src={spark.user.avatar || `https://ui-avatars.com/api/?name=${spark.user.name}&background=random`}
                                    alt={spark.user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div >
                            <h3 className="font-bold text-lg drop-shadow-md">{spark.user.name}</h3>
                            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold transition-colors border border-white/20">
                                Follow
                            </button>
                        </div >
                        <p className="text-lg font-medium mb-4 leading-relaxed drop-shadow-md line-clamp-3">
                            {spark.description}
                        </p>
                        <div className="flex items-center gap-2 text-white/90 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <Music2 size={14} className="animate-pulse" />
                            <span>Original Audio - {spark.user.name}</span>
                        </div>
                    </div >

                    <div className="flex flex-col gap-6 mb-20 md:mb-8 items-center">
                        <ActionButton
                            icon={Heart}
                            count={likeCount}
                            active={isLiked}
                            onClick={handleLike}
                            color="text-rose-500"
                        />
                        <ActionButton
                            icon={MessageCircle}
                            count={comments.length}
                            onClick={(e: any) => { e.stopPropagation(); setShowComments(true); }}
                        />
                        <ActionButton
                            icon={Share2}
                            count={shareCount}
                            onClick={handleShare}
                        />
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 overflow-hidden animate-spin-slow">
                            <img
                                src={spark.user.avatar || `https://ui-avatars.com/api/?name=${spark.user.name}&background=random`}
                                className="w-full h-full object-cover"
                                alt="User avatar"
                            />
                        </div>
                    </div>
                </div >
            </div >

            {/* Comments Overlay */}
            <AnimatePresence>
                {
                    showComments && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-x-0 bottom-0 z-40 bg-white rounded-t-3xl h-[70%] md:h-[60%] flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800 text-lg">{comments.length} Comments</h3>
                                <button onClick={() => setShowComments(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="h-6 w-6 text-slate-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {comments.length > 0 ? (
                                    comments.map((comment: any, i: number) => (
                                        <div key={i} className="flex gap-3">
                                            <img src={comment.user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"} className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700">{comment.user?.name || "User"}</p>
                                                <p className="text-slate-600 text-sm">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-400 py-8">No comments yet. Be the first!</div>
                                )}
                            </div>

                            <form onSubmit={handleCommentSubmit} className="p-4 border-t border-slate-100 flex gap-2">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button type="submit" disabled={!commentText.trim()} className="p-2 bg-indigo-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Send className="h-4 w-4" />
                                </button>
                            </form>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </div >
    );
};

const ActionButton = ({ icon: Icon, count, active, onClick, color }: any) => (
    <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1 group"
    >
        <div className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 ${active ? 'bg-white text-rose-500' : 'bg-black/40 text-white hover:bg-black/60'}`}>
            <Icon size={28} className={active && color ? color : "text-white"} fill={active ? "currentColor" : "none"} />
        </div>
        <span className="text-xs font-medium text-white drop-shadow-md">{count}</span>
    </motion.button>
);

export default VideoCard;
