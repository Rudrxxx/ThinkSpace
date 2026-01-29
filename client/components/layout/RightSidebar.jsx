"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

const RightSidebar = () => {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const posts = await api.getPosts();
                setRecentPosts(posts.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch recent posts:', error);
            }
        };
        fetchRecentPosts();
    }, []);

    return (
        <div className="hidden lg:block w-[320px] space-y-6 fixed right-8 top-24 bottom-4 overflow-y-auto scrollbar-hide z-40">
            {/* Recent Posts Widget */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20">
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                    <Sparkles size={16} className="text-secondary animate-pulse" />
                    <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Trending Now</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {recentPosts.length > 0 ? recentPosts.map((post) => (
                        <div key={post._id} className="group p-4 hover:bg-white/5 cursor-pointer transition-all duration-300">
                            <div className="flex items-center gap-2.5 mb-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-secondary blur-sm opacity-0 group-hover:opacity-50 transition-opacity rounded-full"></div>
                                    <img src={post.user?.imageUrl || post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name}`} alt="" className="w-6 h-6 rounded-full relative z-10 ring-1 ring-white/20 group-hover:ring-secondary transition-all" />
                                </div>
                                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{post.user?.name || 'Anonymous'}</span>
                                <span className="text-[10px] text-gray-600">• {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-200 mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
                                {post.content?.substring(0, 60)}{post.content?.length > 60 ? '...' : ''}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                <span className="flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                                    <TrendingUp size={12} />
                                    {post.commentCount || 0} comments
                                </span>
                                <span>{post.likes?.length || 0} likes</span>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Sparkles size={20} className="text-gray-600" />
                            </div>
                            <p className="text-gray-500 text-sm">No cosmic signals yet</p>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-white/5 border-t border-white/10 text-center">
                    <Link href="/explore" className="text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wider">
                        View All Activity
                    </Link>
                </div>
            </div>

            {/* Premium/Ads Placeholder (Optional - Adding for 'Crazy' feel) */}
            <div className="glass-card rounded-2xl p-6 border border-secondary/30 relative overflow-hidden group">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-secondary/10 to-transparent rotate-45 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000"></div>
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">ThinkSpace <span className="text-secondary">Pro</span></h3>
                <p className="text-sm text-gray-400 mb-4 relative z-10">Unlock the multiverse. Infinite spaces, zero limits.</p>
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-secondary to-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_var(--color-secondary)] transition-all transform hover:scale-[1.02] relative z-10">
                    Upgrade Now
                </button>
            </div>

            {/* Footer Links */}
            <div className="px-4 py-2 text-[10px] text-gray-600 font-mono">
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                    <Link href="#" className="hover:text-primary transition-colors">PRIVACY</Link>
                    <Link href="#" className="hover:text-primary transition-colors">TERMS</Link>
                    <Link href="#" className="hover:text-primary transition-colors">CODE</Link>
                </div>
                <p className="opacity-50">THINKSPACE © 2026. MADE WITH <span className="text-red-500 animate-pulse">❤</span> IN THE CLOUD.</p>
            </div>
        </div>
    );
};

export default RightSidebar;
