import type { PropsWithChildren } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RevealOnScroll({ children }: PropsWithChildren) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return <div ref={ref}>{children}</div>;
}
