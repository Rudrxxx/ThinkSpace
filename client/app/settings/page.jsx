"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import ToggleButton from "@/components/ui/ToggleButton";
import { themes } from "@/components/ui/ThemeSelector";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
    Palette,
    Bell,
    Shield,
    User,
    ChevronRight,
    LogOut,
    Smartphone,
    Mail,
    Lock,
    Eye,
    Trash2,
    Check
} from "lucide-react";
import { motion } from "framer-motion";
import { SignOutButton } from "@clerk/nextjs";

export default function SettingsPage() {
    const { currentTheme, changeTheme } = useTheme();

    // Notification Settings State
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        mentions: true,
        newFollowers: true
    });

    // Privacy Settings State
    const [privacy, setPrivacy] = useState({
        privateAccount: false,
        onlineStatus: true,
        readReceipts: true
    });

    const handleNotificationChange = (key, value) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    };

    const handlePrivacyChange = (key, value) => {
        setPrivacy(prev => ({ ...prev, [key]: value }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <MainLayout>
            <motion.div
                className="max-w-4xl mx-auto pb-20 space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                        Settings
                    </h1>
                    <p className="text-slate-400">Manage your preferences and account settings</p>
                </motion.div>

                {/* Appearance Section */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Palette className="text-[var(--color-primary)]" />
                        Appearance
                    </h2>
                    <GlassCard className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-white">Theme</h3>
                            <p className="text-sm text-slate-400">Choose a theme that fits your vibe</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => changeTheme(theme.id)}
                                    className={`relative group rounded-xl overflow-hidden aspect-video transition-all duration-300 ${currentTheme === theme.id
                                        ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-black/50 scale-105'
                                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                                        }`}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            background: theme.preview || theme.background || '#1a1a1a'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-medium text-sm">{theme.name}</span>
                                    </div>
                                    {currentTheme === theme.id && (
                                        <div className="absolute top-2 right-2 bg-[var(--color-primary)] text-white rounded-full p-1 shadow-lg">
                                            <Check size={12} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="text-xs text-white font-medium ml-1">{theme.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </GlassCard>
                </motion.section>

                {/* Notifications Section */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Bell className="text-[var(--color-primary)]" />
                        Notifications
                    </h2>
                    <GlassCard className="divide-y divide-white/10">
                        <div className="flex items-center justify-between py-4 first:pt-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Push Notifications</h3>
                                    <p className="text-sm text-slate-400">Receive notifications on your device</p>
                                </div>
                            </div>
                            <ToggleButton
                                enabled={notifications.push}
                                onChange={(val) => handleNotificationChange('push', val)}
                            />
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Email Notifications</h3>
                                    <p className="text-sm text-slate-400">Receive digest emails and updates</p>
                                </div>
                            </div>
                            <ToggleButton
                                enabled={notifications.email}
                                onChange={(val) => handleNotificationChange('email', val)}
                            />
                        </div>

                        <div className="flex items-center justify-between py-4 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">New Followers</h3>
                                    <p className="text-sm text-slate-400">Notify me when someone follows me</p>
                                </div>
                            </div>
                            <ToggleButton
                                enabled={notifications.newFollowers}
                                onChange={(val) => handleNotificationChange('newFollowers', val)}
                            />
                        </div>
                    </GlassCard>
                </motion.section>

                {/* Privacy & Security Section */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="text-[var(--color-primary)]" />
                        Privacy & Security
                    </h2>
                    <GlassCard className="divide-y divide-white/10">
                        <div className="flex items-center justify-between py-4 first:pt-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Private Account</h3>
                                    <p className="text-sm text-slate-400">Only approved followers can see your posts</p>
                                </div>
                            </div>
                            <ToggleButton
                                enabled={privacy.privateAccount}
                                onChange={(val) => handlePrivacyChange('privateAccount', val)}
                            />
                        </div>

                        <div className="flex items-center justify-between py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Change Password</h3>
                                    <p className="text-sm text-slate-400">Update your security credentials</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-500" />
                        </div>
                    </GlassCard>
                </motion.section>

                {/* Account Actions */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <User className="text-[var(--color-primary)]" />
                        Account
                    </h2>
                    <GlassCard className="divide-y divide-white/10">
                        <SignOutButton>
                            <button className="w-full flex items-center justify-between py-4 first:pt-0 text-left hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-slate-500/20 text-slate-400">
                                        <LogOut size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Sign Out</h3>
                                        <p className="text-sm text-slate-400">Log out of your account session</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-500" />
                            </button>
                        </SignOutButton>

                        <button className="w-full flex items-center justify-between py-4 last:pb-0 text-left hover:bg-red-500/10 transition-colors rounded-lg px-2 -mx-2 group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-red-500/20 text-red-500 group-hover:text-red-400">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-red-500 font-medium group-hover:text-red-400">Delete Account</h3>
                                    <p className="text-sm text-red-500/60 group-hover:text-red-400/80">Permanently delete your account and all data</p>
                                </div>
                            </div>
                            <ChevronRight className="text-red-500/50 group-hover:text-red-400" />
                        </button>
                    </GlassCard>
                </motion.section>
            </motion.div>
        </MainLayout>
    );
}

