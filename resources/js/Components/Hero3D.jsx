import { Component, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';

const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sigil 3D: tiga cincin menyala di sudut berbeda, berputar + reaktif ke mouse.
function Sigil({ pointer }) {
    const g = useRef();
    useFrame((_, delta) => {
        const m = g.current;
        if (!m) return;
        if (!prefersReduced) m.rotation.z += delta * 0.12;
        const targetX = pointer.current.y * 0.35;
        const targetY = pointer.current.x * 0.5;
        m.rotation.x += (targetX + Math.PI / 2.2 - m.rotation.x) * 0.04;
        m.rotation.y += (targetY - m.rotation.y) * 0.04;
    });
    return (
        <group ref={g} rotation={[Math.PI / 2.2, 0, 0]}>
            <mesh>
                <torusGeometry args={[2.5, 0.018, 16, 140]} />
                <meshStandardMaterial color="#c81912" emissive="#ff3b1f" emissiveIntensity={2.4} toneMapped={false} />
            </mesh>
            <mesh rotation={[0.4, 0.2, 0]}>
                <torusGeometry args={[2.0, 0.012, 16, 140]} />
                <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={2.6} toneMapped={false} />
            </mesh>
            <mesh rotation={[-0.3, 0, 0.2]}>
                <torusGeometry args={[3.05, 0.01, 16, 160]} />
                <meshStandardMaterial color="#ffd6a0" emissive="#ff7a45" emissiveIntensity={1.8} toneMapped={false} />
            </mesh>
        </group>
    );
}

// Core "molten" yang melayang + permukaan ter-distort.
function Core() {
    return (
        <Float speed={prefersReduced ? 0 : 1.6} rotationIntensity={prefersReduced ? 0 : 1} floatIntensity={prefersReduced ? 0 : 1.3}>
            <mesh>
                <icosahedronGeometry args={[1.15, 6]} />
                <MeshDistortMaterial
                    color="#5a0a0a"
                    emissive="#c81912"
                    emissiveIntensity={1.5}
                    roughness={0.25}
                    metalness={0.5}
                    distort={prefersReduced ? 0 : 0.38}
                    speed={prefersReduced ? 0 : 2.2}
                    toneMapped={false}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Listener global & passive → tidak mengganggu scroll/tap/klik.
        const onMove = (e) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 4, 6]} intensity={120} color="#ff6b35" decay={2} />
            <pointLight position={[-6, -3, 2]} intensity={90} color="#c81912" decay={2} />
            <Core />
            <Sigil pointer={pointer} />
            {!prefersReduced && (
                <Sparkles count={70} scale={[11, 9, 5]} size={3.5} speed={0.5} noise={1.5} color="#ff8a4c" />
            )}
        </>
    );
}

// Kalau WebGL gagal / error, jangan bikin halaman blank — cukup sembunyikan scene.
class Boundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }
    static getDerivedStateFromError() {
        return { failed: true };
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

export default function Hero3D() {
    return (
        <Boundary>
            <Canvas
                className="hero3d-canvas"
                dpr={[1, 1.8]}
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <Scene />
            </Canvas>
        </Boundary>
    );
}
