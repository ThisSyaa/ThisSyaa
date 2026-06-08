import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProjectCard({ p, i }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image inside the card
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <a
            ref={cardRef}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="project-card reveal reveal-up"
            style={{ '--stagger': i }}
        >
            <div className="project-cover">
                {p.cover.endsWith('.mp4') ? (
                    <motion.video 
                        style={{ y, scale: 1.15, height: '130%', top: '-15%' }} 
                        src={p.cover} autoPlay loop muted playsInline 
                    />
                ) : (
                    <motion.img 
                        style={{ y, scale: 1.15, height: '130%', top: '-15%', position: 'absolute', width: '100%', objectFit: 'cover' }} 
                        src={p.cover} alt={p.name} loading="lazy" 
                    />
                )}
                <div className="project-overlay">
                    <span className="view-btn">Lihat Project ↗</span>
                </div>
            </div>
            <div className="project-info">
                <div className="project-head">
                    <span className="project-emoji">{p.emoji}</span>
                    <span className="project-num">{p.num}</span>
                </div>
                <h3 className="project-title">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                    {p.tags.map((t) => (
                        <span className="ptag" key={t}>{t}</span>
                    ))}
                </div>
            </div>
        </a>
    );
}
