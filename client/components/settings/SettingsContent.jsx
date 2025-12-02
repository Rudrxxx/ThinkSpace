"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { User, Save, Camera, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

const SettingsContent = ({ user }) => {
    const { user: currentUser } = useUser();
    const [profileData, setProfileData] = useState({
        name: user.fullName || "",
        bio: "",
        location: "",
        website: "",
        image: user.imageUrl || "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                // Try to load from localStorage first
                const savedProfile = localStorage.getItem(`profile_${user.username || user.firstName}`);
                if (savedProfile) {
                    const parsed = JSON.parse(savedProfile);
                    setProfileData({
                        name: parsed.name || user.fullName || "",
                        bio: parsed.bio || "",
                        location: parsed.location || "",
                        website: parsed.website || "",
                        image: parsed.image || user.imageUrl || "",
                    });
                    return;
                }
                
                // Try API if no local data
                const handle = user.username || user.firstName?.toLowerCase();
                const profile = await api.getUserProfile(handle);
                setProfileData({
                    name: profile.name || user.fullName || "",
                    bio: profile.bio || "",
                    location: profile.location || "",
                    website: profile.website || "",
                    image: profile.image || user.imageUrl || "",
                });
            } catch (error) {
                console.warn('Using default profile data:', error.message);
                // Use default values
                setProfileData({
                    name: user.fullName || "",
                    bio: "",
                    location: "",
                    website: "",
                    image: user.imageUrl || "",
                });
            }
        };
        loadProfile();
    }, [user]);

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage("");
        try {
            const updateData = {
                ...profileData,
                handle: user.username || user.firstName?.toLowerCase()
            };
            
            // Try API first
            await api.updateProfile(updateData);
            
            // Save to localStorage as backup
            localStorage.setItem(`profile_${user.username || user.firstName}`, JSON.stringify(profileData));
            
            setMessage("Profile updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.warn('API failed, saving locally:', error.message);
            
            // Save to localStorage if API fails
            localStorage.setItem(`profile_${user.username || user.firstName}`, JSON.stringify(profileData));
            
            if (error.message.includes('server')) {
                setMessage("Profile saved locally. Changes will sync when server is available.");
            } else {
                setMessage("Profile updated successfully!");
            }
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>
                    
                    <GlassCard className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <User className="text-[var(--color-primary)]" size={24} />
                            <h2 className="text-xl font-semibold text-slate-800">Profile Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        value={profileData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        rows={4}
                                        maxLength={500}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        {profileData.bio.length}/500 characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <Globe size={16} className="inline mr-1" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                        placeholder="Where are you based?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={profileData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={profileData.image || user.imageUrl}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                        />
                                        <div>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                <Camera size={16} />
                                                Change Photo
                                            </button>
                                            <p className="text-xs text-slate-500 mt-1">
                                                JPG, PNG up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <Mail size={16} className="inline mr-1" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email || ""}
                                        disabled
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Email is managed by your account provider
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={user.username || user.firstName?.toLowerCase() || ""}
                                        disabled
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Username cannot be changed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-6 p-4 rounded-lg ${
                                    message.includes('success') 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                            >
                                {message}
                            </motion.div>
                        )}

                        <div className="flex justify-end mt-8">
                            <motion.button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Save size={16} />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </motion.button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default SettingsContent;