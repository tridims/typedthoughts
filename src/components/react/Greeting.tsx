import { useEffect, useState } from "react";

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
    const [greeting, setGreeting] = useState<Greeting>(greetings[0]);

    useEffect(() => {
        const randomGreeting =
            greetings[Math.floor(Math.random() * greetings.length)];
        setGreeting(randomGreeting);
    }, []);

    return (
        <div className="z-10 text-center px-8 drop-shadow-lg shadow-black">
            <div className="uppercase text-sm mb-4 font-title">
                {greeting.main}
            </div>
            <div className="text-4xl font-title font-medium">
                {greeting.secondary}
                <span className="text-orange-500">
                    {" "}
                    {greeting.secondary_two}
                </span>
            </div>
        </div>
    );
}
