const MultimodalIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Metro/Train */}
      <rect x="4" y="8" width="16" height="12" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="6" y="10" width="5" height="6" fill="white" opacity="0.6" />
      <rect x="13" y="10" width="5" height="6" fill="white" opacity="0.6" />
      
      {/* Car */}
      <path
        d="M24 28 L26 24 L38 24 L40 28 L42 28 L42 38 L40 38 L40 40 L38 40 L38 38 L26 38 L26 40 L24 40 L24 38 L22 38 L22 28 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="27" cy="35" r="2" fill="white" opacity="0.7" />
      <circle cx="37" cy="35" r="2" fill="white" opacity="0.7" />
      <rect x="28" y="26" width="8" height="5" rx="1" fill="white" opacity="0.5" />
      
      {/* Auto Rickshaw */}
      <path
        d="M44 44 L46 40 L54 40 L56 44 L57 44 L57 52 L55 52 L55 54 L53 54 L53 52 L47 52 L47 54 L45 54 L45 52 L43 52 L43 44 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M46 40 L48 36 L52 36 L54 40" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="47" cy="50" r="1.5" fill="white" opacity="0.7" />
      <circle cx="53" cy="50" r="1.5" fill="white" opacity="0.7" />
      
      {/* Bus */}
      <rect x="6" y="44" width="20" height="14" rx="2" fill="currentColor" opacity="0.85" />
      <rect x="8" y="47" width="6" height="6" fill="white" opacity="0.5" />
      <rect x="16" y="47" width="6" height="6" fill="white" opacity="0.5" />
      <circle cx="10" cy="56" r="1.5" fill="white" opacity="0.7" />
      <circle cx="22" cy="56" r="1.5" fill="white" opacity="0.7" />
      
      {/* Connection lines */}
      <path d="M20 14 L24 28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
      <path d="M40 32 L44 44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
      <path d="M26 44 L32 38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
};

export default MultimodalIcon;
