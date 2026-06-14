// RuneRail — thematic nav replacing the hamburger. A fixed vertical rail of 4 runes
// on the right edge; the active scene's rune ignites; hover reveals its label.
import { useEffect, useState } from 'react';
import FlameMeter from './FlameMeter';

const RUNES = [
    { id: 'descent', num: 'I', label: 'Profile' },
    { id: 'powers', num: 'II', label: 'Language' },
    { id: 'relics', num: 'III', label: 'Project' },
    { id: 'pact', num: 'IV', label: 'Contact' },
];

export default function RuneRail() {
    const [active, setActive] = useState('descent');

    useEffect(() => {
        const sections = RUNES.map((r) => document.getElementById(r.id)).filter(Boolean);
        const onScroll = () => {
            const mid = window.innerHeight / 2;
            let closest = null, closestDist = Infinity;
            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                const dist = Math.abs(rect.top + rect.height / 2 - mid);
                if (dist < closestDist) { closestDist = dist; closest = sec; }
            });
            if (closest) setActive(closest.id);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="rune-rail" aria-label="Navigasi adegan">
            <span className="rail-line" aria-hidden="true" />
            <ul className="rail-runes">
                {RUNES.map((r) => (
                    <li key={r.id}>
                        <a
                            href={`#${r.id}`}
                            className={`rune interactive ${active === r.id ? 'is-active' : ''}`}
                            aria-current={active === r.id ? 'true' : undefined}
                            aria-label={r.label}
                        >
                            <span className="rune-num" aria-hidden="true">{r.num}</span>
                            <span className="rune-label">{r.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <FlameMeter />
        </nav>
    );
}
