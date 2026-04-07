'use client';

import { useEffect, useRef, useState, PropsWithChildren } from 'react';

export function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 1500;
                    const startTime = performance.now();
                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // ease-out cubic (fast to slow)
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                        else setCount(target);
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
        <div ref={ref} className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300">
            {count}{suffix}
        </div>
    );
}

export default function AnimatedStats({ children }: PropsWithChildren) {
    const ref = useRef<HTMLElement>(null);
    const hasSnapped = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasSnapped.current && entry.intersectionRatio < 0.5) {
                    hasSnapped.current = true;
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative py-20 bg-[var(--surface)] overflow-hidden">
            {children}
        </section>
    );
}
