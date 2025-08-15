import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Greeting {
    main: string;
    secondary: string;
    secondary_two: string;
}

const greetings: Greeting[] = [
    {
        main: "Welcome, digital traveler! 🚀",
        secondary: "Welcome to",
        secondary_two: "my corner of the internet! 🌍",
    },
    {
        main: "Hey there, friend! 👋",
        secondary: "Welcome to",
        secondary_two: "my corner of the internet!",
    },
    {
        main: "Hello, world! 🌍",
        secondary: "Let's dive into something",
        secondary_two: "interesting today.",
    },
    {
        main: "Hi and welcome! 😊",
        secondary: "I'm so glad you're",
        secondary_two: "here.",
    },
    {
        main: "Hey you! 👀",
        secondary: "Thanks for stopping by —",
        secondary_two: "you're in for a treat.",
    },
    {
        main: "Greetings, curious minds! 🧠",
        secondary: "Let's learn and",
        secondary_two: "grow together.",
    },
    {
        main: "Hey hey! 🎉",
        secondary: "Ready to read",
        secondary_two: "something cool?",
    },
];

export default function Greeting() {
    // Track greeting by index for simpler cycling
    const [index, setIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Pick a random initial greeting on mount
    useEffect(() => {
        setIndex(Math.floor(Math.random() * greetings.length));
    }, []);

    // Animate in per-character whenever the greeting index changes
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            const chars = el.querySelectorAll(".tt-char");
            if (!chars.length) return;
            // Prepare will-change for smoother animation
            gsap.set(chars, { willChange: "transform, opacity" });
            // Match requested style: from { opacity: 0, y: 40 } to visible
            gsap.fromTo(
                chars,
                { y: 12, opacity: 0 }, // shorter travel
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8, // faster intro
                    ease: "power3.out",
                    stagger: 0.01, // 10ms
                    onComplete: () => {
                        gsap.set(chars, { clearProps: "willChange" });
                    },
                },
            );
        }, containerRef);
        return () => ctx.revert();
    }, [index]);

    // Every 3s, animate out per-character then switch to next greeting
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const interval = window.setInterval(() => {
            const chars = el.querySelectorAll(".tt-char");
            if (!chars.length) {
                // Fallback: advance anyway
                setIndex((prev) => (prev + 1) % greetings.length);
                return;
            }
            gsap.killTweensOf(chars);
            gsap.to(chars, {
                y: -12, // shorter travel out
                opacity: 0,
                duration: 0.2, // faster exit
                ease: "power3.in",
                stagger: 0.005,
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % greetings.length);
                },
            });
        }, 3000);

        return () => {
            window.clearInterval(interval);
            // Kill any running tweens on unmount
            gsap.killTweensOf(el.children);
        };
    }, []);

    const greeting = greetings[index];

    // Util: split a string into individually wrapped characters for GSAP
    const renderChars = (text: string, extraClass = "") => {
        return (
            <span className="tt-line whitespace-pre">
                {Array.from(text).map((ch, i) => (
                    <span
                        key={`${ch}-${i}`}
                        className={`tt-char inline-block ${extraClass}`}
                    >
                        {ch}
                    </span>
                ))}
            </span>
        );
    };
    return (
        <div ref={containerRef} className="z-10 text-center px-8 drop-shadow-lg shadow-black">
            <div className="uppercase text-sm mb-4 font-title">
                {renderChars(greeting.main)}
            </div>
            <div className="text-4xl font-title font-medium">
                {renderChars(greeting.secondary)}
                {" "}
                {renderChars(greeting.secondary_two, "text-orange-500")}
            </div>
        </div>
    );
}
