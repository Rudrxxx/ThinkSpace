"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";


export default function SparkFeed() {
    const uniqueMessages = [
        "Just discovered a new way to optimize React components! ⚛️ #coding #reactjs",
        "The sunset today is absolutely breathtaking. Nature is the best artist. 🌅 #nature #beauty",
        "Reading 'The Pragmatic Programmer' again. It never gets old. 📚 #books #learning",
        "Coffee and code. The perfect Sunday morning combination. ☕💻 #sundayvibes",
        "Why do we fall? So we can learn to pick ourselves up. 💪 #motivation #batman",
        "Exploring the new features in Next.js 14. Server Actions are a game changer! 🚀 #nextjs #webdev",
        "Just finished a 5k run! Feeling energized. 🏃‍♂️ #fitness #health",
        "Music is the soundtrack of your life. What are you listening to today? 🎧 #music #vibes",
        "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs 🎨 #design #ux",
        "Trying out a new recipe for dinner tonight. Wish me luck! 🍳 #cooking #foodie",
        "The best way to predict the future is to create it. ✨ #innovation #future",
        "Debugging: Being the detective in a crime movie where you are also the murderer. 🕵️‍♂️ #programmerhumor",
        "Travel is the only thing you buy that makes you richer. ✈️ #travel #wanderlust",
        "Just launched my new portfolio website! Check it out. 🌐 #portfolio #webdesign",
        "Artificial Intelligence is evolving so fast. Exciting times ahead! 🤖 #ai #tech",
        "Simplicity is the ultimate sophistication. - Leonardo da Vinci 🖌️ #art #minimalism",
        "Grateful for the little things in life. 🙏 #gratitude #mindfulness",
        "Learning a new language is like opening a new window to the world. 🌍 #languages #learning",
        "Creativity is intelligence having fun. - Albert Einstein 💡 #creativity #inspiration",
        "Remember to take breaks and drink water! 💧 #selfcare #reminder"
    ];

    const [sparks, setSparks] = useState<any[]>(
        Array.from({ length: 200 }).map((_, i) => ({
            _id: `${i + 1}`,
            user: {
                name: `User ${i + 1}`,
                handle: `@user${i + 1}`,
                avatar: `https://ui-avatars.com/api/?name=User+${i + 1}&background=random`
            },
            content: uniqueMessages[i % uniqueMessages.length],
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 50),
            shares: Math.floor(Math.random() * 20),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
        }))
    );
    const [loading, setLoading] = useState(true);
    const [newSparkContent, setNewSparkContent] = useState("");

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handlePostSpark = () => {
        if (!newSparkContent.trim()) return;

        const newSpark = {
            _id: `new-${Date.now()}`,
            user: {
                name: "You",
                handle: "@you",
                avatar: "https://ui-avatars.com/api/?name=You&background=random"
            },
            content: newSparkContent,
            likes: 0,
            comments: 0,
            shares: 0,
            createdAt: new Date().toISOString()
        };

        setSparks([newSpark, ...sparks]);
        setNewSparkContent("");
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Sparks</h1>
                    <p className="text-slate-500">See what's happening right now.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-slate-200 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Compose Spark */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=You&background=random" alt="You" className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="What's sparking?"
                                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400"
                                        value={newSparkContent}
                                        onChange={(e) => setNewSparkContent(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handlePostSpark();
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                                        <div className="flex gap-2 text-indigo-500">
                                            {/* Icons could go here */}
                                        </div>
                                        <button
                                            onClick={handlePostSpark}
                                            disabled={!newSparkContent.trim()}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Spark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed */}
                        {sparks.map((spark) => (
                            <div key={spark._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                                        <img src={spark.user.avatar} alt={spark.user.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-800">{spark.user.name}</span>
                                            <span className="text-slate-500 text-sm">{spark.user.handle}</span>
                                            <span className="text-slate-400 text-sm">·</span>
                                            <span className="text-slate-400 text-sm">{new Date(spark.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-slate-700 mb-4 leading-relaxed">
                                            {spark.content}
                                        </p>
                                        <div className="flex justify-between text-slate-500 max-w-md">
                                            <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-indigo-50">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                </div>
                                                <span className="text-sm">{spark.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-green-600 transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-green-50">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                </div>
                                                <span className="text-sm">{spark.shares}</span>
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-rose-600 transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-rose-50">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                                </div>
                                                <span className="text-sm">{spark.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-indigo-50">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

// Refactored to text-based feed
// Added unique messages
// Implemented infinite scroll
// Added user numbering
// Added spark functionality
// Updated feed UI
// Refactored to text-based feed
// Added unique messages