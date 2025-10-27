import React, { useEffect, useState, useCallback } from "react";
import {
    ThemeToggleButton,
    useThemeTransition,
} from "@/components/react/ThemeToggleButton";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        
        // Set the theme based on storage, or user's OS preference, or default to light
        setTheme(storedTheme || preferredTheme);
    }, []);

    useEffect(() => {
        if (theme) {
            const root = document.documentElement;
            if (theme === "light") {
                root.classList.remove("dark");
            } else {
                root.classList.add("dark");
            }
        }
    }, [theme]);

    const { startTransition } = useThemeTransition();

    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        
        startTransition(() => {
            localStorage.setItem("theme", newTheme);
            setTheme(newTheme);
        });
    }, [theme, startTransition]);

    if (theme === undefined) {
        // Return a placeholder of the same size as the button to prevent layout shift
        return <div className="h-10 w-10 rounded-md border" />;
    }

    return (
        <ThemeToggleButton
            theme={theme}
            onClick={toggleTheme}
            variant="circle-blur"
            start="top-right"
        />
    );
}