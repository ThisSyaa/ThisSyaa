// DemonCrown3D — a REAL 3D crown (three.js), not a flat SVG sticker.
// Gold metallic band + horned cone spikes + glowing ember gem, floating & gently rocking
// so its dimensionality reads. Rendered in a small transparent r3f canvas placed over the deity's head.
import { Component, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import DemonCrown from './DemonCrown';

const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SPIKES = 9;
const HEIGHTS = [1.25, 0.8, 0.62, 0.5, 0.46, 0.46, 0.5, 0.62, 0.8]; // i=0 front (tallest), symmetric
const R = 1;
const BAND_TOP = 0.26;
const LEAN = 0.17;

function Gold(props) {
    return <meshStandardMaterial color="#241038" metalness={0.92} roughness={0.34} emissive="#7a1fc0" emissiveIntensity={0.75} {...props} />;
}

function CrownMesh() {
    const g = useRef();
    useFrame((state) => {
        if (!g.current || prefersReduced) return;
        g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    });

    const spikes = [];
    for (let i = 0; i < SPIKES; i++) {
        const angle = -Math.PI / 2 + i * ((Math.PI * 2) / SPIKES);
        const h = HEIGHTS[i % HEIGHTS.length];
        spikes.push(
            <group key={i} rotation={[0, angle, 0]}>
                <group position={[R, BAND_TOP, 0]} rotation={[0, 0, -LEAN]}>
                    <mesh position={[0, h / 2, 0]}>
                        <coneGeometry args={[0.13, h, 6]} />
                        <Gold />
                    </mesh>
                    <mesh position={[0, h + 0.03, 0]}>
                        <sphereGeometry args={[0.055, 10, 10]} />
                        <meshStandardMaterial color="#ff6ae0" emissive="#ff2ad0" emissiveIntensity={3.2} toneMapped={false} />
                    </mesh>
                </group>
            </group>
        );
    }

    return (
        <group ref={g} position={[0, -0.7, 0]}>
            {/* band */}
            <mesh>
                <cylinderGeometry args={[R, R, 0.52, 56, 1, true]} />
                <Gold side={2} />
            </mesh>
            {/* rims */}
            <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[R, 0.05, 16, 64]} />
                <Gold />
            </mesh>
            <mesh position={[0, -0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[R, 0.07, 16, 64]} />
                <Gold />
            </mesh>
            {spikes}
            {/* front ember gem */}
            <mesh position={[0, 0, R + 0.04]}>
                <icosahedronGeometry args={[0.23, 0]} />
                <meshStandardMaterial color="#ff4ad8" emissive="#ff2ad0" emissiveIntensity={2.9} metalness={0.3} roughness={0.16} toneMapped={false} />
            </mesh>
            <pointLight position={[0, 0, R + 0.3]} intensity={7} color="#ff2ad0" distance={3} />
        </group>
    );
}

class Boundary extends Component {
    constructor(props) { super(props); this.state = { failed: false }; }
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function DemonCrown3D({ className = '' }) {
    return (
        <span className={`demon-crown-3d ${className}`} aria-hidden="true">
            <Boundary fallback={<DemonCrown variant="hero" />}>
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.7], fov: 42 }} gl={{ alpha: true, antialias: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[2, 3, 3]} intensity={30} color="#c89aff" />
                    <pointLight position={[-3, -1, 2]} intensity={18} color="#ff2ad0" />
                    <Float speed={prefersReduced ? 0 : 1.4} rotationIntensity={0} floatIntensity={prefersReduced ? 0 : 0.7}>
                        <CrownMesh />
                    </Float>
                    <Environment resolution={64}>
                        <Lightformer intensity={2.7} color="#c89aff" position={[0, 2, 3]} scale={6} />
                        <Lightformer intensity={1.7} color="#ff2ad0" position={[-3, -1, 2]} scale={4} />
                        <Lightformer intensity={1.2} color="#e6ccff" position={[3, 2, -2]} scale={3} />
                    </Environment>
                </Canvas>
            </Boundary>
        </span>
    );
}
