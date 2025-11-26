interface IconProps {
  className?: string;
}

export const CarIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Curved sedan body - white with silver outline */}
    <path
      d="M10 24C10 24 12 16 14 14C16 12 18 12 24 12C30 12 32 12 34 14C36 16 38 24 38 24C38 24 40 26 40 28V34C40 35 39 36 38 36H10C9 36 8 35 8 34V28C8 26 10 24 10 24Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Windows - silver */}
    <path
      d="M15 18C15 18 17 14 24 14C31 14 33 18 33 18L31 24H17L15 18Z"
      fill="#9CA3AF"
      opacity="0.4"
    />
    {/* Wheels - black */}
    <circle cx="15" cy="34" r="3" fill="#000000" />
    <circle cx="33" cy="34" r="3" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="15" cy="34" r="1.5" fill="#9CA3AF" />
    <circle cx="33" cy="34" r="1.5" fill="#9CA3AF" />
  </svg>
);

export const SedanIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Flowing sedan body - white with silver outline */}
    <path
      d="M8 25C8 25 10 15 13 13C16 11 19 11 24 11C29 11 32 11 35 13C38 15 40 25 40 25C40 25 42 27 42 29V35C42 36 41 37 40 37H8C7 37 6 36 6 35V29C6 27 8 25 8 25Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Windows with curves - silver */}
    <path
      d="M14 17C14 17 16 12 24 12C32 12 34 17 34 17C34 17 35 22 35 24H13C13 22 14 17 14 17Z"
      fill="#9CA3AF"
      opacity="0.3"
    />
    {/* Door line */}
    <path d="M24 12L24 25" stroke="#9CA3AF" strokeWidth="1" />
    {/* Wheels - black */}
    <circle cx="14" cy="35" r="3.5" fill="#000000" />
    <circle cx="34" cy="35" r="3.5" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="14" cy="35" r="1.5" fill="#9CA3AF" />
    <circle cx="34" cy="35" r="1.5" fill="#9CA3AF" />
  </svg>
);

export const SUVIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Rounded SUV body - white with silver outline */}
    <path
      d="M8 22C8 22 10 10 14 10H34C38 10 40 22 40 22C40 22 42 24 42 26V36C42 37 41 38 40 38H8C7 38 6 37 6 36V26C6 24 8 22 8 22Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Large windows - silver */}
    <path
      d="M14 12H34C34 12 36 14 36 20H12C12 14 14 12 14 12Z"
      fill="#9CA3AF"
      opacity="0.3"
    />
    {/* Door lines */}
    <path d="M24 10V22" stroke="#9CA3AF" strokeWidth="1" />
    <path d="M12 22H36" stroke="#9CA3AF" strokeWidth="1" />
    {/* Wheels - black */}
    <circle cx="14" cy="36" r="4" fill="#000000" />
    <circle cx="34" cy="36" r="4" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="14" cy="36" r="1.8" fill="#9CA3AF" />
    <circle cx="34" cy="36" r="1.8" fill="#9CA3AF" />
  </svg>
);

export const PremierIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Elegant curved sedan - white with silver outline */}
    <path
      d="M9 24C9 24 11 14 14 12C17 10 20 10 24 10C28 10 31 10 34 12C37 14 39 24 39 24C39 24 41 26 41 28V34C41 35 40 36 39 36H9C8 36 7 35 7 34V28C7 26 9 24 9 24Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Premium windows - silver */}
    <path
      d="M15 16C15 16 17 11 24 11C31 11 33 16 33 16L32 24H16L15 16Z"
      fill="#9CA3AF"
      opacity="0.35"
    />
    {/* Premium star badge - silver */}
    <path
      d="M24 6L25 9L28 9.5L26 11.5L26.5 14.5L24 13L21.5 14.5L22 11.5L20 9.5L23 9L24 6Z"
      fill="#9CA3AF"
      stroke="#9CA3AF"
      strokeWidth="0.5"
    />
    {/* Wheels - black */}
    <circle cx="15" cy="34" r="3" fill="#000000" />
    <circle cx="33" cy="34" r="3" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="15" cy="34" r="1.3" fill="#9CA3AF" />
    <circle cx="33" cy="34" r="1.3" fill="#9CA3AF" />
  </svg>
);

export const BikeIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Bike wheels - black with silver spokes */}
    <circle cx="13" cy="32" r="6" stroke="#000000" strokeWidth="2" fill="none" />
    <circle cx="35" cy="32" r="6" stroke="#000000" strokeWidth="2" fill="none" />
    {/* Wheel hubs - silver */}
    <circle cx="13" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="35" cy="32" r="2" fill="#9CA3AF" />
    {/* Frame - curved lines - white/silver */}
    <path
      d="M13 32C13 32 17 24 20 18C21 16 22 15 24 15C26 15 27 16 28 18C29 20 31 26 35 32"
      stroke="#9CA3AF"
      strokeWidth="2.5"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Handlebars - silver */}
    <path
      d="M22 16C22 14 24 12 24 12C24 12 26 14 26 16"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Seat - white with silver outline */}
    <ellipse cx="20" cy="18" rx="3" ry="1.5" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
  </svg>
);

export const ElectricIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Smooth electric sedan - white with silver outline */}
    <path
      d="M9 24C9 24 11 14 14 12C17 10 20 10 24 10C28 10 31 10 34 12C37 14 39 24 39 24C39 24 41 26 41 28V34C41 35 40 36 39 36H9C8 36 7 35 7 34V28C7 26 9 24 9 24Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Windows - silver */}
    <path
      d="M15 16C15 16 17 11 24 11C31 11 33 16 33 16L32 24H16L15 16Z"
      fill="#9CA3AF"
      opacity="0.3"
    />
    {/* Electric lightning bolt - gold accent */}
    <path
      d="M26 8L21 16H26L22 24"
      stroke="#FFD700"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Wheels - black */}
    <circle cx="15" cy="34" r="3" fill="#000000" />
    <circle cx="33" cy="34" r="3" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="15" cy="34" r="1.3" fill="#9CA3AF" />
    <circle cx="33" cy="34" r="1.3" fill="#9CA3AF" />
  </svg>
);

export const ShuttleIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Rounded shuttle bus body - white with silver outline */}
    <rect
      x="8"
      y="14"
      width="32"
      height="20"
      rx="4"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    {/* Windows - silver, curved */}
    <rect x="11" y="17" width="7" height="6" rx="1" fill="#9CA3AF" opacity="0.4" />
    <rect x="20" y="17" width="8" height="6" rx="1" fill="#9CA3AF" opacity="0.4" />
    <rect x="30" y="17" width="7" height="6" rx="1" fill="#9CA3AF" opacity="0.4" />
    {/* Horizontal line */}
    <path d="M8 26H40" stroke="#9CA3AF" strokeWidth="1.5" />
    {/* Wheels - black */}
    <circle cx="15" cy="36" r="3.5" fill="#000000" />
    <circle cx="33" cy="36" r="3.5" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="15" cy="36" r="1.5" fill="#9CA3AF" />
    <circle cx="33" cy="36" r="1.5" fill="#9CA3AF" />
  </svg>
);

export const CourierIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Rounded package box - white with silver outline */}
    <rect
      x="16"
      y="12"
      width="16"
      height="20"
      rx="2"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    {/* Package tape - silver */}
    <path d="M16 22H32" stroke="#9CA3AF" strokeWidth="1.5" />
    <path d="M24 12V32" stroke="#9CA3AF" strokeWidth="1.5" />
    {/* Delivery arrow - black accent */}
    <path
      d="M20 32L24 36L28 32"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small detail dots - silver */}
    <circle cx="20" cy="17" r="1" fill="#9CA3AF" />
    <circle cx="28" cy="17" r="1" fill="#9CA3AF" />
  </svg>
);

export const BlackIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Luxury curved sedan - BLACK body with white details */}
    <path
      d="M8 24C8 24 10 13 14 11C18 9 21 9 24 9C27 9 30 9 34 11C38 13 40 24 40 24C40 24 42 26 42 28V34C42 35 41 36 40 36H8C7 36 6 35 6 34V28C6 26 8 24 8 24Z"
      fill="#000000"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Windows - white */}
    <path
      d="M15 15C15 15 17 10 24 10C31 10 33 15 33 15L32 24H16L15 15Z"
      fill="#FFFFFF"
      opacity="0.3"
    />
    {/* Luxury trim line - white */}
    <path d="M10 24H38" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
    {/* Wheels - black with silver trim */}
    <circle cx="15" cy="34" r="3.5" fill="#000000" stroke="#9CA3AF" strokeWidth="1" />
    <circle cx="33" cy="34" r="3.5" fill="#000000" stroke="#9CA3AF" strokeWidth="1" />
    {/* Wheel centers - white */}
    <circle cx="15" cy="34" r="1.3" fill="#FFFFFF" />
    <circle cx="33" cy="34" r="1.3" fill="#FFFFFF" />
  </svg>
);

export const PetIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Curved sedan body - white with silver outline */}
    <path
      d="M9 24C9 24 11 14 14 12C17 10 20 10 24 10C28 10 31 10 34 12C37 14 39 24 39 24C39 24 41 26 41 28V34C41 35 40 36 39 36H9C8 36 7 35 7 34V28C7 26 9 24 9 24Z"
      fill="#FFFFFF"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Windows - silver */}
    <path
      d="M15 16C15 16 17 11 24 11C31 11 33 16 33 16L32 24H16L15 16Z"
      fill="#9CA3AF"
      opacity="0.3"
    />
    {/* Paw print - silver accent */}
    <ellipse cx="24" cy="15" rx="2.5" ry="3" fill="#9CA3AF" opacity="0.6" />
    <circle cx="21" cy="12" r="1.3" fill="#9CA3AF" opacity="0.6" />
    <circle cx="27" cy="12" r="1.3" fill="#9CA3AF" opacity="0.6" />
    <circle cx="20" cy="17" r="1" fill="#9CA3AF" opacity="0.6" />
    <circle cx="28" cy="17" r="1" fill="#9CA3AF" opacity="0.6" />
    {/* Wheels - black */}
    <circle cx="15" cy="34" r="3" fill="#000000" />
    <circle cx="33" cy="34" r="3" fill="#000000" />
    {/* Wheel centers - silver */}
    <circle cx="15" cy="34" r="1.3" fill="#9CA3AF" />
    <circle cx="33" cy="34" r="1.3" fill="#9CA3AF" />
  </svg>
);

const iconMap: Record<string, React.FC<IconProps>> = {
  "uber-go": CarIcon,
  "go-sedan": SedanIcon,
  "uber-xl": SUVIcon,
  "premier": PremierIcon,
  "go-priority": CarIcon,
  "request-any": CarIcon,
  "bike": BikeIcon,
  "electric": ElectricIcon,
  "shuttle": ShuttleIcon,
  "go-rentals": CarIcon,
  "premier-rentals": PremierIcon,
  "xl-rentals": SUVIcon,
  "courier": CourierIcon,
  "black-rentals": BlackIcon,
  "bike-saver": BikeIcon,
  "black": BlackIcon,
  "uber-pet": PetIcon,
};

export const getRideIcon = (rideId: string) => {
  return iconMap[rideId] || CarIcon;
};
