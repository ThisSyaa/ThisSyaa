import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CustomCursor() {
    // Gunakan useMotionValue dari Framer Motion untuk koordinat X, Y, dan scroll
    // Ini bypass siklus re-render React (useState) yang menyebabkan lag/berat
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    
    // Memberikan efek spring/elastisitas tanpa React state
    const smoothX = useSpring(mouseX, { stiffness: 600, damping: 30, mass: 0.2 });
    const smoothY = useSpring(mouseY, { stiffness: 600, damping: 30, mass: 0.2 });

    const scrollProgress = useMotionValue(0);
    
    // Hover tetap pakai useState karena kita perlu trigger animasi CSS (scale/color)
    // yang tidak dijalankan di setiap frame mousemove
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const updateMousePosition = (e) => {
            // Langsung update node DOM via Framer Motion, 0 lag.
            mouseX.set(e.clientX - 12);
            mouseY.set(e.clientY - 12);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
            // Update motion value tanpa re-render komponen
            scrollProgress.set(scroll);
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        handleScroll();

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [mouseX, mouseY, scrollProgress]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    const circleCircumference = 2 * Math.PI * 18;
    // Map scrollProgress (0 ke 1) menjadi strokeDashoffset (circumference ke 0)
    const dashOffset = useTransform(scrollProgress, [0, 1], [circleCircumference, 0]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] flex items-center justify-center bg-white shadow-[0_0_15px_rgba(94,234,212,0.8)]"
            style={{ x: smoothX, y: smoothY }}
            animate={{
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(94,234,212,0.1)' : 'rgba(255,255,255,1)',
                border: isHovering ? '1px solid rgba(94,234,212,1)' : 'none'
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.2 }}
        >
            <svg 
                className="absolute w-[44px] h-[44px]" 
                viewBox="0 0 40 40" 
                style={{ transform: 'rotate(-90deg)', opacity: isHovering ? 0 : 1, transition: 'opacity 0.2s' }}
            >
                <motion.circle 
                    cx="20" cy="20" r="18" 
                    fill="none" 
                    stroke="rgba(94,234,212,0.8)" 
                    strokeWidth="1.5"
                    strokeDasharray={circleCircumference}
                    style={{ strokeDashoffset: dashOffset }}
                />
            </svg>
        </motion.div>
    );
}
