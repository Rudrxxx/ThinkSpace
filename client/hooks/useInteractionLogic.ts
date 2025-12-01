import { useState, useEffect } from "react";

interface InteractionCounts {
    spark: number;
    dim: number;
    thoughts: number;
    spread: number;
}

interface UseInteractionLogicProps {
    initialCounts?: InteractionCounts;
    onInteraction?: (type: string, value: number) => void;
}

export const useInteractionLogic = ({ initialCounts = { spark: 0, dim: 0, thoughts: 0, spread: 0 }, onInteraction }: UseInteractionLogicProps) => {
    const [counts, setCounts] = useState(initialCounts);
    const [active, setActive] = useState<{ [key: string]: boolean }>({
        spark: false,
        dim: false,
        thoughts: false,
        spread: false,
    });

    useEffect(() => {
        setCounts(initialCounts);
    }, [initialCounts.spark, initialCounts.dim, initialCounts.thoughts, initialCounts.spread]);

    const handleInteraction = (type: keyof InteractionCounts, onThoughtsClick?: () => void) => {
        if (type === "thoughts") {
            if (onThoughtsClick) onThoughtsClick();
            return;
        }

        if (type === "spread") {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
            setCounts((prev) => ({ ...prev, spread: prev.spread + 1 }));
            return;
        }

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

        if (onInteraction) {
            onInteraction(type, newCounts[type]);
            if (type === "spark" && isNowActive && active.dim) onInteraction("dim", newCounts.dim);
            if (type === "dim" && isNowActive && active.spark) onInteraction("spark", newCounts.spark);
        }
    };

    return { counts, active, handleInteraction, setCounts };
};
