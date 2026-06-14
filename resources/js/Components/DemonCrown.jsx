// 👑 DemonCrown — "Spiked Sovereign" demon-god crown as SVG (NOT a flat PNG).
// Used in 3 places: hero (large, crown of fire), logo (small), favicon (handled separately in public/favicon.svg).
let _seq = 0;

export default function DemonCrown({ variant = 'hero', animated = true, className = '' }) {
    // unique gradient ids per instance so multiple crowns on one page don't collide
    const id = `dc${variant}${_seq++}`;
    return (
        <span className={`demon-crown dc-${variant} ${animated ? 'is-animated' : ''} ${className}`} aria-hidden="true">
            <svg viewBox="0 0 120 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#fff3cf" />
                        <stop offset="0.4" stopColor="#ffd66b" />
                        <stop offset="0.7" stopColor="#f5b740" />
                        <stop offset="1" stopColor="#b8741f" />
                    </linearGradient>
                    <radialGradient id={`${id}-gem`} cx="0.5" cy="0.38" r="0.62">
                        <stop offset="0" stopColor="#ffe2bf" />
                        <stop offset="0.4" stopColor="#ff6b2c" />
                        <stop offset="1" stopColor="#8a1c06" />
                    </radialGradient>
                    <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="2.4" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* jagged horned crown: outer spikes lean out (demon horns), centre tallest */}
                <path
                    className="dc-body"
                    filter={`url(#${id}-glow)`}
                    fill={`url(#${id}-gold)`}
                    stroke="#7a4a12"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    d="M14,62 L8,14 L26,48 L40,18 L52,42 L60,5 L68,42 L80,18 L94,48 L112,14 L106,62 Z"
                />
                {/* base band */}
                <rect className="dc-band" x="10" y="58" width="100" height="20" rx="4" fill={`url(#${id}-gold)`} stroke="#7a4a12" strokeWidth="1" />
                {/* band rivets */}
                <circle cx="24" cy="68" r="2.2" fill="#7a4a12" />
                <circle cx="96" cy="68" r="2.2" fill="#7a4a12" />
                {/* central ember gem */}
                <circle className="dc-gem" cx="60" cy="68" r="7" fill={`url(#${id}-gem)`} />
                {/* tip embers */}
                <g className="dc-embers">
                    <circle cx="60" cy="5" r="2.4" />
                    <circle cx="40" cy="18" r="1.7" />
                    <circle cx="80" cy="18" r="1.7" />
                    <circle cx="8" cy="14" r="1.7" />
                    <circle cx="112" cy="14" r="1.7" />
                </g>
            </svg>
        </span>
    );
}
