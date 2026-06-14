import { useEffect, useState, useCallback } from 'react';

const LEVELS = ['subtle', 'balanced', 'inferno'];
const LABELS = { subtle: 'Tenang', balanced: 'Membara', inferno: 'Inferno' };

export default function FlameMeter() {
    const [level, setLevel] = useState('balanced');

    // Sinkronkan dengan nilai yang sudah di-set anti-FOUC script di <head>.
    useEffect(() => {
        let initial = 'balanced';
        try {
            initial = localStorage.getItem('syaaxi-intensity') || 'balanced';
        } catch (e) { /* localStorage diblok — pakai default */ }
        if (!LEVELS.includes(initial)) initial = 'balanced';
        setLevel(initial);
        document.documentElement.dataset.intensity = initial;
    }, []);

    const cycle = useCallback(() => {
        setLevel((prev) => {
            const next = LEVELS[(LEVELS.indexOf(prev) + 1) % LEVELS.length];
            document.documentElement.dataset.intensity = next;
            try { localStorage.setItem('syaaxi-intensity', next); } catch (e) { /* ignore */ }
            return next;
        });
    }, []);

    const activeIndex = LEVELS.indexOf(level);

    return (
        <button
            type="button"
            className="flame-meter interactive"
            onClick={cycle}
            data-level={level}
            title={`Kekuatan sang dewa iblis: ${LABELS[level]} — klik buat ganti`}
            aria-label={`Intensitas tema saat ini: ${LABELS[level]}. Klik untuk mengganti.`}
        >
            <span className="fm-bars" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                    <b key={i} className={i <= activeIndex ? 'on' : ''} />
                ))}
            </span>
            <svg className="fm-sigil" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 2c0 3-3 4-3 7 0 1 .5 2 1.4 2.4-.2-1.6.6-2.6 1.6-3.2-.3 2 .9 2.8 1.4 4 .8 1.9-.4 4.3-2.4 4.7 3.4.3 6-1.7 6-5 0-4.2-4.2-5.6-5.6-9.9z" fill="currentColor" />
            </svg>
        </button>
    );
}
