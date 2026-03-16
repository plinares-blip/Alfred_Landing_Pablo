"use client";

import { useEffect, useState, useRef } from "react";

export function useActiveValue<T extends HTMLElement>(itemIds: string[], rootMargin = "-40% 0px -40% 0px") {
    const [activeId, setActiveId] = useState<string>("");

    // We'll use a map to keep track of visibility ratios if needed, 
    // but for simple "center focus" intersection observer works well with correct margins.

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin,
            threshold: 0.5, // Trigger when 50% visible (after margin adjustment)
        });

        itemIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [itemIds, rootMargin]);

    return activeId;
}
