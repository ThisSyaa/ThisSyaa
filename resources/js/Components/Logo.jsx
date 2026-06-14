import DemonCrown from './DemonCrown';

export default function Logo() {
    return (
        <a href="#descent" className="logo" aria-label="Syaaxi — beranda">
            <DemonCrown variant="logo" className="logo-crown" />
            <span className="logo-word">Syaa<b>xi.</b></span>
        </a>
    );
}
