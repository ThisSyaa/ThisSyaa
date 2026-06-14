import { useEffect, useRef } from 'react';

export default function NetworkBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        let animationFrameId;

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            
            const numParticles = Math.min(Math.floor(window.innerWidth / 12), 120);

            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 1,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.015 + Math.random() * 0.02
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        const opacity = 1 - (dist / 160);
                        
                        // Color based on x position: left teal, right purple/indigo
                        const avgX = (p1.x + p2.x) / 2;
                        const ratio = avgX / width;
                        
                        const r = Math.round(200 + ratio * (255 - 200));
                        const g = Math.round(25 + ratio * (107 - 25));
                        const b = Math.round(18 + ratio * (53 - 18));

                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles with pulse
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges smoothly
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                p.pulsePhase += p.pulseSpeed;
                const pulseIntensity = (Math.sin(p.pulsePhase) + 1) / 2; // 0 to 1
                const baseOpacity = 0.2 + (pulseIntensity * 0.8);

                const ratio = p.x / width;
                const r = Math.round(200 + ratio * (255 - 200));
                const g = Math.round(25 + ratio * (107 - 25));
                const b = Math.round(18 + ratio * (53 - 18));

                // Glow effect
                ctx.shadowBlur = 15 * pulseIntensity;
                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius + (pulseIntensity * 1.5), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`;
                ctx.fill();
                
                // Reset shadow to not affect lines
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        init();
        draw();

        window.addEventListener('resize', init);

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="network-bg absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
}
