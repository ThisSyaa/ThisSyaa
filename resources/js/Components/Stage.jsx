// Stage — single persistent r3f canvas: the obsidian throne hall behind everything.
// Replaces Hero3D + NetworkBackground. Fixed full-viewport; scroll dollies the camera (the "descent").
import { Component, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';

const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SPARKLE = { subtle: 28, balanced: 72, inferno: 130 };
const EMISSIVE = { subtle: 0.8, balanced: 1.3, inferno: 2.1 };

function useIntensity() {
    const [intensity, setIntensity] = useState(
        () => (typeof document !== 'undefined' && document.documentElement.dataset.intensity) || 'balanced'
    );
    useEffect(() => {
        const el = document.documentElement;
        const read = () => setIntensity(el.dataset.intensity || 'balanced');
        const obs = new MutationObserver(read);
        obs.observe(el, { attributes: true, attributeFilter: ['data-intensity'] });
        read();
        return () => obs.disconnect();
    }, []);
    return intensity;
}

// Molten throne core
function ThroneCore({ emissive }) {
    return (
        <Float speed={prefersReduced ? 0 : 1.3} rotationIntensity={prefersReduced ? 0 : 0.7} floatIntensity={prefersReduced ? 0 : 1.1}>
            <mesh position={[0, -0.2, 0]}>
                <icosahedronGeometry args={[1.02, 6]} />
                <MeshDistortMaterial
                    color="#16082a" emissive="#c01fd6" emissiveIntensity={emissive}
                    roughness={0.35} metalness={0.6}
                    distort={prefersReduced ? 0 : 0.34} speed={prefersReduced ? 0 : 2} toneMapped={false}
                />
            </mesh>
        </Float>
    );
}

// Gold sigil rings, pointer-reactive
function Sigil({ pointer }) {
    const g = useRef();
    useFrame((_, delta) => {
        const m = g.current;
        if (!m) return;
        if (!prefersReduced) m.rotation.z += delta * 0.1;
        const tx = pointer.current.y * 0.3;
        const ty = pointer.current.x * 0.45;
        m.rotation.x += (tx + Math.PI / 2.2 - m.rotation.x) * 0.04;
        m.rotation.y += (ty - m.rotation.y) * 0.04;
    });
    return (
        <group ref={g} rotation={[Math.PI / 2.2, 0, 0]}>
            <mesh><torusGeometry args={[2.7, 0.013, 16, 160]} /><meshStandardMaterial color="#8a1fd6" emissive="#8a1fd6" emissiveIntensity={1.35} toneMapped={false} /></mesh>
            <mesh rotation={[0.4, 0.2, 0]}><torusGeometry args={[2.15, 0.009, 16, 140]} /><meshStandardMaterial color="#b14dff" emissive="#b14dff" emissiveIntensity={1.45} toneMapped={false} /></mesh>
            <mesh rotation={[-0.3, 0, 0.2]}><torusGeometry args={[3.3, 0.008, 16, 160]} /><meshStandardMaterial color="#ff2ad0" emissive="#ff2ad0" emissiveIntensity={1.15} toneMapped={false} /></mesh>
        </group>
    );
}

// Scroll-driven camera dolly (the descent)
function Rig({ scrollRef }) {
    const { camera } = useThree();
    useFrame(() => {
        const target = -scrollRef.current * 2.4;
        camera.position.y += (target - camera.position.y) * 0.05;
        camera.position.z += (8 + scrollRef.current * 1.5 - camera.position.z) * 0.05;
        camera.lookAt(0, camera.position.y * 0.35, 0);
    });
    return null;
}

function Scene({ intensity }) {
    const pointer = useRef({ x: 0, y: 0 });
    const scrollRef = useRef(0);

    useEffect(() => {
        const onMove = (e) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = h > 0 ? window.scrollY / h : 0;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const count = SPARKLE[intensity] ?? 72;
    const emissive = EMISSIVE[intensity] ?? 1.9;

    return (
        <>
            <ambientLight intensity={0.45} />
            <pointLight position={[5, 4, 6]} intensity={100} color="#d04bff" decay={2} />
            <pointLight position={[-6, -2, 3]} intensity={74} color="#ff2ad0" decay={2} />
            <ThroneCore emissive={emissive} />
            <Sigil pointer={pointer} />
            {!prefersReduced && count > 0 && (
                <Sparkles count={count} scale={[13, 11, 6]} size={3.2} speed={0.45} noise={1.4} color="#d96aff" />
            )}
            <Rig scrollRef={scrollRef} />
        </>
    );
}

// Never blank the page if WebGL fails.
class Boundary extends Component {
    constructor(props) { super(props); this.state = { failed: false }; }
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? null : this.props.children; }
}

export default function Stage() {
    const intensity = useIntensity();
    return (
        <div className="stage-canvas" aria-hidden="true">
            <Boundary>
                <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                >
                    <color attach="background" args={['#08070c']} />
                    <fog attach="fog" args={['#08070c', 8, 21]} />
                    <Scene intensity={intensity} />
                </Canvas>
            </Boundary>
        </div>
    );
}
