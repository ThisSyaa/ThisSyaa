import { useEffect, useRef } from 'react';
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import { 
    siHtml5, siJavascript, siPhp, siLaravel, 
    siReact, siMysql, siTailwindcss, siNodedotjs, 
    siGit, siGithub, siFigma, siVite, siNextdotjs
} from 'simple-icons';

const customGithub = { ...siGithub, hex: 'ffffff' };
const customNextjs = { ...siNextdotjs, hex: 'ffffff' };

const icons = [
    siHtml5, siJavascript, siPhp, siLaravel, 
    siReact, siMysql, siTailwindcss, siNodedotjs,
    siGit, customGithub, siFigma, siVite, customNextjs
].map((icon) => {
    return renderSimpleIcon({
        icon,
        size: 80,
        fallbackHex: '#ffffff',
        aProps: {
            onClick: (e) => e.preventDefault(),
            style: { cursor: 'pointer' }
        }
    });
});

export default function SkillsCloud() {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // TagCanvas secara agresif melakukan e.preventDefault() pada event scroll/wheel.
        // Hal ini mematikan fungsi scroll halaman saat kursor berada di atas canvas.
        // Solusinya: Kita tangkap event wheel di fase "capture" (sebelum mencapai canvas),
        // dan hentikan propagasinya ke bawah. Dengan begini, canvas tidak bisa mencegah scroll.
        const stopCanvasWheelTrap = (e) => {
            e.stopPropagation();
        };

        wrapper.addEventListener('wheel', stopCanvasWheelTrap, true);
        wrapper.addEventListener('mousewheel', stopCanvasWheelTrap, true);
        wrapper.addEventListener('DOMMouseScroll', stopCanvasWheelTrap, true);

        return () => {
            wrapper.removeEventListener('wheel', stopCanvasWheelTrap, true);
            wrapper.removeEventListener('mousewheel', stopCanvasWheelTrap, true);
            wrapper.removeEventListener('DOMMouseScroll', stopCanvasWheelTrap, true);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="flex justify-center items-center w-full min-h-[600px] cursor-grab active:cursor-grabbing relative z-10" style={{ touchAction: 'none' }}>
            <Cloud
                containerProps={{ style: { width: '100%', height: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
                options={{ 
                    clickToFront: 500, 
                    wheelZoom: false, 
                    imageScale: 2, 
                    outlineColour: '#0000', 
                    tooltip: 'native',
                    initial: [0.1, -0.1],
                    activeCursor: 'grabbing',
                    depth: 1,
                    maxSpeed: 0.02,
                    minSpeed: 0.01
                }}
            >
                {icons}
            </Cloud>
        </div>
    );
}
