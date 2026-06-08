import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProjectCard from '../Components/ProjectCard';
import SkillsCloud from '../Components/SkillsCloud';
import NetworkBackground from '../Components/NetworkBackground';

export default function Welcome() {
    // 2. Buat state untuk mendeteksi menu terbuka/tertutup
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk membuka/menutup menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const skills = [
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', radius: 140, duration: 25, dir: 'normal' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', radius: 190, duration: 32, dir: 'reverse' },
        { name: 'PHP / Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', radius: 240, duration: 22, dir: 'normal' },
        { name: 'React / Inertia', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', radius: 290, duration: 38, dir: 'reverse' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', radius: 340, duration: 28, dir: 'normal' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', radius: 390, duration: 45, dir: 'reverse' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', radius: 440, duration: 35, dir: 'normal' },
    ];

    const projects = [
        {
            emoji: '🇰🇷',
            num: '01',
            name: 'SR Korean Translate',
            desc: 'Aplikasi web penerjemah bahasa Korea dengan antarmuka yang bersih dan mudah digunakan.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            link: 'https://sr-korean-translate.vercel.app/',
            cover: '/images/sr_korean_translate.mp4'
        },
        {
            emoji: '🛒',
            num: '02',
            name: 'E-Commerce Store',
            desc: 'Platform toko online modern.',
            tags: ['Next.js', 'Tailwind', 'Stripe'],
            link: '#',
            cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop'
        },
        {
            emoji: '📊',
            num: '03',
            name: 'Analytics Dashboard',
            desc: 'Dashboard interaktif untuk visualisasi data.',
            tags: ['Vue.js', 'Chart.js', 'REST API'],
            link: '#',
            cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
        },
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
            updateActiveNav();

            document.querySelectorAll('.scroll-driven').forEach((el) => {
                const rect = el.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = 1 - Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh * 0.75);
                const clamped = Math.max(0, Math.min(1, progress));
                el.style.setProperty('--scroll-progress', clamped);
            });
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

        // Magnetic Buttons Logic
        const magneticBtns = document.querySelectorAll('.btn-magnetic');
        const handleMagneticMove = (e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

            const glow = btn.querySelector('.btn-glow');
            if (glow) {
                glow.style.left = `${e.clientX - rect.left}px`;
                glow.style.top = `${e.clientY - rect.top}px`;
            }
        };
        const handleMagneticLeave = (e) => {
            e.currentTarget.style.transform = `translate(0px, 0px)`;
        };
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', handleMagneticMove);
            btn.addEventListener('mouseleave', handleMagneticLeave);
        });

        // Hero Mouse Parallax Logic
        const heroSection = document.querySelector('#profile');
        const heroCutout = document.querySelector('.hero-cutout');
        const heroWatermark = document.querySelector('.hero-watermark');

        const handleParallax = (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;

            if (heroCutout) heroCutout.style.transform = `translate(${x}px, ${y}px)`;
            if (heroWatermark) heroWatermark.style.transform = `translate(-50%, -50%) translate(${x * -0.5}px, ${y * -0.5}px)`;
        };
        const handleParallaxLeave = () => {
            if (heroCutout) heroCutout.style.transform = `translate(0px, 0px)`;
            if (heroWatermark) heroWatermark.style.transform = `translate(-50%, -50%) translate(0px, 0px)`;
        };

        if (heroSection) {
            heroSection.addEventListener('mousemove', handleParallax);
            heroSection.addEventListener('mouseleave', handleParallaxLeave);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            revealObs.disconnect();
            magneticBtns.forEach(btn => {
                btn.removeEventListener('mousemove', handleMagneticMove);
                btn.removeEventListener('mouseleave', handleMagneticLeave);
            });
            if (heroSection) {
                heroSection.removeEventListener('mousemove', handleParallax);
                heroSection.removeEventListener('mouseleave', handleParallaxLeave);
            }
        };
    }, []);

    return (
        <>
            <Head title="Portofolio Syaa" />

            <div>
                {/* AMBIENT BACKGROUND */}
                <div className="ambient-background">
                    <NetworkBackground />
                    <div className="noise-overlay"></div>
                </div>

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
                <section id="profile" className="hero-container relative w-full min-h-screen flex items-center overflow-hidden">
                    
                    {/* GIANT WATERMARK */}
                    <div className="hero-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                        SYAAXI
                    </div>

                    {/* FREE-STANDING HERO IMAGE */}
                    <div className="hero-cutout-wrapper absolute -bottom-5 right-[12%] h-[90vh] z-10 pointer-events-none flex flex-col items-center">
                        
                        {/* MAGIC CIRCLE (SIGIL) INTERSECTING IN 3D */}
                        <div className="magic-circle-3d">
                            <div className="ring ring-1"></div>
                            <div className="ring ring-2"></div>
                            <div className="ring ring-3"></div>
                            <div className="runes"></div>
                        </div>

                        <img 
                            src="/images/hero-cutout.png" 
                            alt="Hero Syaa" 
                            className="hero-cutout h-full w-auto object-contain"
                        />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="hero-content relative z-20 w-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
                        <div className="hero-eyebrow-container animate-entrance delay-100">
                            <span className="hero-eyebrow-line"></span>
                            <p className="hero-eyebrow">Fullstack Developer</p>
                        </div>

                        <div className="hero-title-container animate-entrance delay-200 mt-6">
                            <h1 className="hero-title-giant">
                                Halo,<br />Saya <em>Syaa</em>
                            </h1>
                        </div>

                        <div className="bio-staggered mt-8 max-w-xl">
                            <div className="stagger-line delay-300">
                                <p>Saya seorang manusia biasa yang berfokus membangun <span className="highlight">produk digital</span> yang <span className="highlight">fungsional</span>, <span className="highlight">cepat</span>, dan <span className="highlight">mudah digunakan</span>.</p>
                            </div>
                            <div className="stagger-line delay-400 mt-4">
                                <p>Dengan pengalaman di <span className="highlight">Laravel</span>, <span className="highlight">React</span>, dan ekosistemnya, saya senang mengubah ide sederhana menjadi aplikasi yang nyata. Di luar kode, saya penggemar kopi hitam dan desain tipografi.</p>
                            </div>
                        </div>

                        <div className="hero-actions animate-entrance delay-500 mt-12">
                            <a href="#contact" className="btn-magnetic btn-primary">
                                <span className="btn-text">Hubungi Saya</span>
                                <span className="btn-glow"></span>
                            </a>
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
                    <div className="reveal reveal-up w-full flex justify-center py-10 relative">
                        <div className="hero-glow absolute opacity-30 pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                        <SkillsCloud />
                    </div>
                </section>

                <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

                {/* PROJECTS */}
                <section id="projects">
                    <div className="section-header reveal reveal-left">
                        <p className="section-eyebrow">Selected Work</p>
                        <h2 className="section-title">Project Pilihan</h2>
                    </div>
                    <div className="projects-grid">
                        {projects.map((p, i) => (
                            <ProjectCard p={p} i={i} key={p.num} />
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
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
                                label: 'Email', value: 'muhammadsyafiqasshidiq@gmail.com', href: 'mailto:muhammadsyafiqasshidiq@gmail.com'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
                                label: 'LinkedIn', value: 'Muhammad Syafiq As Shidiq', href: 'https://www.linkedin.com/in/muhammad-syafiq-as-shidiq-429296310'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
                                label: 'GitHub', value: 'ThisSyaa', href: 'https://github.com/ThisSyaa'
                            },
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