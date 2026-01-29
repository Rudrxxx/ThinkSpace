"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

export const themes = [
  {
    id: 'space',
    name: 'Space',
    preview: 'linear-gradient(135deg, #0a0118, #1a0b2e)',
    background: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    preview: 'linear-gradient(135deg, #001122, #003366)',
    background: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preview: 'linear-gradient(135deg, #ff6b35, #f7931e)',
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: 'linear-gradient(135deg, #0d4f3c, #2d5a27)',
    background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'mountain',
    name: 'Mountain',
    preview: 'linear-gradient(135deg, #4a5568, #2d3748)',
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'city',
    name: 'City',
    preview: 'linear-gradient(135deg, #1a202c, #2d3748)',
    background: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'desert',
    name: 'Desert',
    preview: 'linear-gradient(135deg, #c05621, #ed8936)',
    background: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    preview: 'linear-gradient(135deg, #065f46, #10b981)',
    background: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
    background: null
  }
];

const ThemeSelector = ({ isOpen, onClose, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState('space');

  useEffect(() => {
    const saved = localStorage.getItem('thinkspace-theme');
    if (saved) setSelectedTheme(saved);
  }, []);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    localStorage.setItem('thinkspace-theme', themeId);
    onThemeChange(themeId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="ultra-glass rounded-3xl p-6 max-w-md w-full border-2 border-cyan-400/30"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Choose Theme</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                className={`relative p-4 rounded-2xl border-2 transition-all ${selectedTheme === theme.id
                    ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                    : 'border-white/20 hover:border-white/40'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <div
                  className="w-full h-16 rounded-xl mb-3"
                  style={{ background: theme.preview }}
                />
                <p className="text-white text-sm font-medium">{theme.name}</p>

                {selectedTheme === theme.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check size={14} className="text-black" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 btn-cyber rounded-2xl py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
          >
            Apply Theme
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeSelector;