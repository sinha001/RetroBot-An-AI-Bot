const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="48"
    height="48"
    fill="none"
  >
    {/* Chat bubble */}
    <rect
      x="8"
      y="12"
      width="48"
      height="36"
      rx="6"
      ry="6"
      stroke="#4C585B" // Indigo 600 Tailwind color
      strokeWidth="3"
      fill="#ebe2cc" // Retro beige
    />
    {/* Pixel "play" triangle */}
    <polygon points="26,22 38,30 26,38" fill="#f59e0b" />{' '}
    {/* Amber - Tailwind */}
    {/* Speech tail (pixelated style) */}
    <rect x="20" y="48" width="8" height="4" fill="#ebe2cc" />
    <rect x="28" y="44" width="4" height="8" fill="#ebe2cc" />
  </svg>
);

export default Logo;
