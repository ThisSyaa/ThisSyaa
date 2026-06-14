import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import ProjectCard from '../Components/ProjectCard';
import SkillsCloud from '../Components/SkillsCloud';
import CustomCursor from '../Components/CustomCursor';
import Logo from '../Components/Logo';
import DemonCrown3D from '../Components/DemonCrown3D';
import Stage from '../Components/Stage';
import RuneRail from '../Components/RuneRail';

export default function Welcome() {
    const projects = [
        {
            emoji: '🇰🇷', num: '01', name: 'SR Korean Translate',
            desc: 'Aplikasi web penerjemah bahasa Korea dengan antarmuka yang bersih dan mudah digunakan.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            link: 'https://sr-korean-translate.vercel.app/',
            cover: '/images/sr_korean_translate.mp4',
        },
        {
            emoji: '🛒', num: '02', name: 'E-Commerce Store',
            desc: 'Platform toko online modern.',
            tags: ['Java', 'JavaScript', 'HTML', 'CSS'],
            link: 'https://electronic.up.railway.app/',
            cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop',
        },
        {
            emoji: '📊', num: '03', name: 'Analytics Dashboard',
            desc: 'Dashboard interaktif untuk visualisasi data.',
            tags: ['Vue.js', 'Chart.js', 'REST API'],
            link: '#',
            cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
        },
    ];

    const socials = [
        {
            label: 'Email', href: 'mailto:muhammadsyafiqasshidiq@gmail.com',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        },
        {
            label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-syafiq-as-shidiq-429296310', blank: true,
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
        },
        {
            label: 'GitHub', href: 'https://github.com/ThisSyaa', blank: true,
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
        },
    ];

    useEffect(() => {
        const revealObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
            }),
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
        return () => revealObs.disconnect();
    }, []);

    return (
        <>
            <Head title="Syaaxi · Fullstack Developer" />

            <CustomCursor />
            <Stage />
            <div className="world-vignette" aria-hidden="true" />
            <div className="world-grain" aria-hidden="true" />

            <div className="logo-fixed"><Logo /></div>
            <RuneRail />

            <main>
            {/* ADEGAN I — THE DESCENT */}
            <section id="descent" className="scene-descent">
                <div className="descent-stage">
                    <h1 className="god-name">Syaa</h1>
                    <DemonCrown3D className="deity-crown-3d" />
                    <img src="/images/hero-cutout.png" alt="Potret Syaa, sang dewa iblis" className="deity-figure" />
                </div>
                <div className="descent-copy">
                    <p className="eyebrow">Fullstack Developer</p>
                    <div className="god-bio">
                        <p>Fullstack developer yang meramu ide menjadi produk digital — cepat, fungsional, dan enak digunakan.</p>
                        <p>Berkutat di ekosistem Laravel dan React, saya mengubah baris kode menjadi pengalaman yang terasa hidup.</p>
                    </div>
                    <div className="hero-actions">
                        <a href="#relics" className="btn-ember">Lihat Karya</a>
                        <a href="#pact" className="btn-ghost">Ikat Pakta</a>
                    </div>
                </div>
                <div className="descend-cue" aria-hidden="true"><span>Turun</span><i></i></div>
            </section>

            <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

            {/* ADEGAN II — POWERS */}
            <section id="powers" className="scene">
                <div className="scene-header reveal reveal-up">
                    <p className="section-eyebrow">Powers</p>
                    <h2 className="scene-title">Kuasa Sang Dewa</h2>
                </div>
                <div className="reveal reveal-up skills-stage">
                    <div className="skills-sigil" aria-hidden="true"><span></span><span></span><span></span></div>
                    <SkillsCloud />
                </div>
            </section>

            <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

            {/* ADEGAN III — RELICS */}
            <section id="relics" className="scene">
                <div className="scene-header reveal reveal-up">
                    <p className="section-eyebrow">Relics</p>
                    <h2 className="scene-title">Relik Penaklukan</h2>
                </div>
                <div className="projects-grid">
                    {projects.map((p, i) => <ProjectCard p={p} i={i} key={p.num} />)}
                </div>
            </section>

            <div className="divider reveal reveal-fade"><div className="divider-line" /></div>

            {/* ADEGAN IV — THE PACT */}
            <section id="pact" className="scene">
                <div className="scene-header reveal reveal-up">
                    <p className="section-eyebrow">The Pact</p>
                    <h2 className="scene-title">Mari Berkolaborasi</h2>
                </div>
                <div className="pact">
                    <div className="reveal reveal-left">
                        <p className="contact-desc">Punya ide menarik atau proyek yang ingin diwujudkan? Saya selalu terbuka untuk obrolan santai maupun kerja sama serius.</p>
                        <a href="mailto:muhammadsyafiqasshidiq@gmail.com" className="btn-ember">Kirim Email</a>
                    </div>
                    <div className="contact-socials reveal reveal-right">
                        {socials.map((c) => (
                            <a key={c.label} href={c.href} target={c.blank ? '_blank' : undefined} rel={c.blank ? 'noreferrer' : undefined}
                                className="contact-icon-btn interactive" aria-label={c.label} title={c.label}>
                                <span className="cib-icon">{c.icon}</span>
                                <span className="cib-label">{c.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            </main>

            <footer className="reveal reveal-fade">
                © 2026 <b>Syaa</b> · ditempa dengan Laravel &amp; React · Ponorogo, Indonesia
            </footer>
        </>
    );
}
