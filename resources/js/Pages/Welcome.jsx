import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react'; // 1. Tambahkan useState di sini

export default function Welcome() {
    // 2. Buat state untuk mendeteksi menu terbuka/tertutup
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk membuka/menutup menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const skills = [
        { name: 'JavaScript', level: 90 },
        { name: 'PHP / Laravel', level: 88 },
        { name: 'React / Inertia', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Node.js', level: 72 },
    ];

    const projects = [
        { emoji: '🌐', num: '01', name: '-', desc: '', tags: ['Laravel', 'React', 'MySQL'] },
        { emoji: '🛒', num: '02', name: '-', desc: '', tags: ['Next.js', 'Tailwind', 'Stripe'] },
        { emoji: '📊', num: '03', name: '-', desc: '', tags: ['Vue.js', 'Chart.js', 'REST API'] },
    ];

    useEffect(() => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = Array.from(document.querySelectorAll('section[id]'));

        const updateActiveNav = () => {
            const mid = window.innerHeight / 2;
            let closest = null;
            let closestDist = Infinity;

            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const dist = Math.abs(center - mid);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = sec;
                }
            });

            navLinks.forEach((link) => {
                link.classList.toggle(
                    'nav-active',
                    closest && link.getAttribute('href') === `#${closest.id}`
                );
            });
        };

        const handleScroll = () => {
            nav?.classList.toggle('nav-scrolled', window.scrollY > 40);
            const glow = document.querySelector('.hero-glow');
            const photoFrame = document.querySelector('.photo-frame');
            if (glow) glow.style.transform = `translateY(${window.scrollY * 0.12}px)`;
            if (photoFrame) photoFrame.style.transform = `translateY(${window.scrollY * 0.04}px)`;
            updateActiveNav();

            document.querySelectorAll('.scroll-driven').forEach((el) => {
                const rect = el.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = 1 - Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh * 0.75);
                const clamped = Math.max(0, Math.min(1, progress));
                el.style.setProperty('--scroll-progress', clamped);
            });

            const skillsRect = document.querySelector('#skills')?.getBoundingClientRect();
            if (skillsRect && skillsRect.top < window.innerHeight * 0.75) {
                document.querySelectorAll('.skill-fill').forEach((bar) => {
                    bar.classList.add('skill-animated');
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateActiveNav(); 

        const revealObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                    } else {
                        e.target.classList.remove('revealed');
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            revealObs.disconnect();
        };
    }, []);

    return (
        <>
            <Head title="Portofolio Syaa" />

            <div>
                {/* NAVBAR */}
                <nav className="animate-entrance">
                    <div className="nav-wrap">
                        <div className="logo">Syaa<b>xi</b>.</div>
                        
                        {/* 3. Class ditambahkan agar menu muncul dari samping jika isOpen = true */}
                        <ul className={`nav-links ${isOpen ? 'menu-open' : ''}`}>
                            <li><a href="#profile" onClick={toggleMenu}>Profile</a></li>
                            <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
                            <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
                            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                        </ul>

                        {/* 4. Tombol Hamburger */}
                        <button 
                            className={`hamburger ${isOpen ? 'open' : ''}`} 
                            onClick={toggleMenu}
                            aria-label="Toggle navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>

                {/* HERO */}
                <section id="profile">
                    <div className="photo-col relative animate-entrance delay-100">
                        <div className="photo-frame group">
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_var(--angle),#6366f1_0%,#c084fc_25%,#6366f1_50%,#c084fc_75%,#6366f1_100%)] animate-[neonWalk_3s_linear_infinite] group-hover:animate-[neonWalk_1.5s_linear_infinite] z-0"></div>
                            <div className="absolute inset-[3px] bg-stone-950 z-[1] overflow-hidden rounded-[2px]">
                                <img
                                    src="https://avatars.githubusercontent.com/u/174694675?v=4"
                                    alt="Foto Syaa"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="photo-badge z-[20]">✦ Ordinary People</div>
                    </div>

                    <div className="text-col">
                        <div className="hero-glow" />
                        <p className="hero-eyebrow animate-entrance delay-200">Fullstack Developer</p>
                        <h1 className="hero-title animate-entrance delay-300">
                            Halo,<br />Saya <em>Syaa</em>
                        </h1>
                        <div className="bio animate-entrance delay-400">
                            <p>Saya seorang manusia biasa yang berfokus membangun produk digital yang fungsional, cepat, dan mudah digunakan.</p>
                            <p>Dengan pengalaman di Laravel, React, dan ekosistemnya, saya senang mengubah ide sederhana menjadi aplikasi yang nyata. Di luar kode, saya penggemar kopi hitam dan desain tipografi.</p>
                        </div>
                        <div className="hero-actions animate-entrance delay-500">
                            <a href="#contact" className="btn-primary">Hubungi Saya</a>
                            <a href="#projects" className="btn-ghost">Lihat Proyek ↓</a>
                        </div>
                    </div>
                </section>

                <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

                {/* SKILLS */}
                <section id="skills">
                    <div className="section-header reveal reveal-left">
                        <p className="section-eyebrow">Expertise</p>
                        <h2 className="section-title">Bahasa & Teknologi</h2>
                    </div>
                    <div className="skills-grid">
                        {skills.map((s, i) => (
                            <div
                                className="skill-item reveal reveal-up"
                                style={{ '--stagger': i }}
                                key={s.name}
                            >
                                <div className="skill-top">
                                    <span className="skill-name">{s.name}</span>
                                    <span className="skill-pct">{s.level}%</span>
                                </div>
                                <div className="skill-track">
                                    <div className="skill-fill" style={{ '--target-width': `${s.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

                {/* PROJECTS */}
                <section id="projects">
                    <div className="section-header reveal reveal-left">
                        <p className="section-eyebrow">Selected Work</p>
                        <h2 className="section-title">Project Pilihan</h2>
                    </div>
                    <div className="projects-list">
                        {projects.map((p, i) => (
                            <div
                                className="project-row reveal reveal-right"
                                style={{ '--stagger': i }}
                                key={p.num}
                            >
                                <div className="proj-emoji">{p.emoji}</div>
                                <div className="proj-body">
                                    <p className="proj-meta">{p.num} — Project</p>
                                    <h3 className="proj-name">{p.name}</h3>
                                    <p className="proj-desc">{p.desc}</p>
                                </div>
                                <div className="proj-tags">
                                    {p.tags.map((t) => (
                                        <span className="tag" key={t}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

                {/* CONTACT */}
                <section id="contact">
                    <div className="contact-left reveal reveal-left">
                        <p className="section-eyebrow">Get In Touch</p>
                        <h2 className="section-title">Mari<br />Berkolaborasi</h2>
                        <p className="contact-desc">Punya ide menarik atau proyek yang ingin diwujudkan? Saya selalu terbuka untuk obrolan santai maupun kerja sama serius.</p>
                        <a href="mailto:muhammadsyafiqasshidiq@gmail.com" className="btn-primary">Kirim Email →</a>
                    </div>
                    <div className="contact-right">
                        {[
                            { icon: '✉️', label: 'Email', value: 'muhammadsyafiqasshidiq@gmail.com', href: 'mailto:muhammadsyafiqasshidiq@gmail.com' },
                            { icon: '💼', label: 'LinkedIn', value: 'Muhammad Syafiq As Shidiq', href: 'https://www.linkedin.com/in/muhammad-syafiq-as-shidiq-429296310' },
                            { icon: '🐙', label: 'GitHub', value: 'ThisSyaa', href: 'https://github.com/ThisSyaa' },
                        ].map((c, i) => (
                            <a
                                href={c.href}
                                className="contact-card reveal reveal-right"
                                style={{ '--stagger': i }}
                                key={c.label}
                            >
                                <div className="contact-icon">{c.icon}</div>
                                <div className="contact-info">
                                    <p className="contact-label">{c.label}</p>
                                    <p className="contact-value">{c.value}</p>
                                </div>
                                <span className="contact-arrow">→</span>
                            </a>
                        ))}
                    </div>
                </section>

                <footer className="reveal reveal-fade">
                    © 2026 Syaa · Built with Laravel & React · Ponorogo, Indonesia
                </footer>
            </div>
        </>
    );
}