"use client";

import React, { useState } from "react";
import { Zap, CloudRain, Brain, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractionBarProps {
    initialCounts?: {
        spark: number;
        dim: number;
        thoughts: number;
        spread: number;
    };
    onThoughtsClick?: () => void;
    onInteraction?: (type: string, value: number) => void;
}

const InteractionBar = ({ initialCounts = { spark: 0, dim: 0, thoughts: 0, spread: 0 }, onThoughtsClick, onInteraction }: InteractionBarProps) => {
    const [counts, setCounts] = useState(initialCounts);
    const [active, setActive] = useState<{ [key: string]: boolean }>({
        spark: false,
        dim: false,
        thoughts: false,
        spread: false,
    });

    React.useEffect(() => {
        setCounts(initialCounts);
    }, [initialCounts.spark, initialCounts.dim, initialCounts.thoughts, initialCounts.spread]);

    const handleInteraction = (type: keyof typeof counts) => {
        if (type === "thoughts") {
            if (onThoughtsClick) {
                onThoughtsClick();
            }
            return;
        }

        if (type === "spread") {
            // Simulate share functionality
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!"); // Simple feedback

            // Increment spread count temporarily for visual feedback
            setCounts((prev) => ({
                ...prev,
                spread: prev.spread + 1,
            }));
            return;
        }

        // Handle Spark (Like) and Dim (Dislike)
        let newActive = { ...active };
        let newCounts = { ...counts };
        const isNowActive = !active[type];

        newActive[type] = isNowActive;

        if (type === "spark") {
            newCounts.spark = isNowActive ? counts.spark + 1 : counts.spark - 1;
            if (isNowActive && active.dim) {
                newActive.dim = false;
                newCounts.dim -= 1;
            }
        } else if (type === "dim") {
            newCounts.dim = isNowActive ? counts.dim + 1 : counts.dim - 1;
            if (isNowActive && active.spark) {
                newActive.spark = false;
                newCounts.spark -= 1;
            }
        }

        setActive(newActive);
        setCounts(newCounts);

        // Notify parent
        if (onInteraction) {
            onInteraction(type, newCounts[type]);

            // If mutual exclusivity changed the other one, notify for that too
            if (type === "spark" && isNowActive && active.dim) {
                onInteraction("dim", newCounts.dim);
            }
            if (type === "dim" && isNowActive && active.spark) {
                onInteraction("spark", newCounts.spark);
            }
        }
    };

    const buttons = [
        {
            id: "spark",
            icon: Zap,
            label: "Spark",
            color: "text-cyan-400",
            glow: "shadow-[0_0_15px_rgba(34,211,238,0.5)]",
            border: "border-cyan-400",
            bg: "bg-cyan-950/30",
        },
        {
            id: "dim",
            icon: CloudRain,
            label: "Dim",
            color: "text-blue-400",
            glow: "shadow-[0_0_15px_rgba(96,165,250,0.5)]",
            border: "border-blue-400",
            bg: "bg-blue-950/30",
        },
        {
            id: "thoughts",
            icon: Brain,
            label: "Thoughts",
            color: "text-pink-500",
            glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
            border: "border-pink-500",
            bg: "bg-pink-950/30",
        },
        {
            id: "spread",
            icon: Share2,
            label: "Spread",
            color: "text-green-400",
            glow: "shadow-[0_0_15px_rgba(74,222,128,0.5)]",
            border: "border-green-400",
            bg: "bg-green-950/30",
        },
    ] as const;

    return (
        <div className="flex items-center justify-between gap-2 w-full mt-4">
            {buttons.map((btn) => {
                const isActive = active[btn.id];
                const count = counts[btn.id as keyof typeof counts];

                return (
                    <button
                        key={btn.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleInteraction(btn.id as keyof typeof counts);
                        }}
                        className={cn(
                            "group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 w-full",
                            btn.bg,
                            btn.border,
                            isActive ? btn.glow : "hover:shadow-lg hover:shadow-white/10"
                        )}
                    >
                        {/* Notification Badge */}
                        <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-600">
                            {(count || 0) >= 1000 ? ((count || 0) / 1000).toFixed(1) + "k" : (count || 0)}
                        </div>

                        <btn.icon
                            size={20}
                            className={cn(
                                "mb-1 transition-all duration-300",
                                btn.color,
                                isActive && "fill-current scale-110"
                            )}
                        />
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider", btn.color)}>
                            {btn.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default InteractionBar;
