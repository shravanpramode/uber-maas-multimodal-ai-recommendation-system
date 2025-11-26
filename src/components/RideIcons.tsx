interface IconProps {
  className?: string;
}

export const CarIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M8 20L12 12H36L40 20V36H8V20Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="14" cy="32" r="3" fill="#9CA3AF" />
    <circle cx="34" cy="32" r="3" fill="#9CA3AF" />
    <path d="M12 20H36V28H12V20Z" fill="#9CA3AF" opacity="0.3" />
  </svg>
);

export const SedanIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 22L10 13H38L42 22V36H6V22Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="33" r="3" fill="#9CA3AF" />
    <circle cx="35" cy="33" r="3" fill="#9CA3AF" />
    <path d="M10 22H38V29H10V22Z" fill="#9CA3AF" opacity="0.4" />
    <path d="M14 13H24L26 22" stroke="#9CA3AF" strokeWidth="1.5" />
  </svg>
);

export const SUVIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 20L10 10H38L42 20V38H6V20Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="34" r="3.5" fill="#9CA3AF" />
    <circle cx="35" cy="34" r="3.5" fill="#9CA3AF" />
    <rect x="10" y="20" width="28" height="12" fill="#9CA3AF" opacity="0.3" />
    <path d="M10 10H38V20" stroke="#9CA3AF" strokeWidth="1.5" />
  </svg>
);

export const PremierIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 22L10 13H38L42 22V36H6V22Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="33" r="3" fill="#9CA3AF" />
    <circle cx="35" cy="33" r="3" fill="#9CA3AF" />
    <path d="M10 22H38V29H10V22Z" fill="#9CA3AF" opacity="0.4" />
    <path
      d="M24 8L26 12L30 13L27 16L28 20L24 18L20 20L21 16L18 13L22 12L24 8Z"
      fill="#9CA3AF"
    />
  </svg>
);

export const BikeIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="12" cy="32" r="6" stroke="#000000" strokeWidth="2" fill="none" />
    <circle cx="36" cy="32" r="6" stroke="#000000" strokeWidth="2" fill="none" />
    <path d="M12 32L20 16L28 20L36 32" stroke="#9CA3AF" strokeWidth="2" />
    <path d="M20 16L24 12L26 16" stroke="#000000" strokeWidth="2" />
    <circle cx="12" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="36" cy="32" r="2" fill="#9CA3AF" />
  </svg>
);

export const ElectricIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 22L10 13H38L42 22V36H6V22Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="33" r="3" fill="#9CA3AF" />
    <circle cx="35" cy="33" r="3" fill="#9CA3AF" />
    <path d="M10 22H38V29H10V22Z" fill="#9CA3AF" opacity="0.4" />
    <path d="M24 10L18 20H24L20 28" stroke="#FFD700" strokeWidth="2" fill="none" />
  </svg>
);

export const ShuttleIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <rect
      x="6"
      y="12"
      width="36"
      height="24"
      rx="2"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="14" cy="38" r="3" fill="#9CA3AF" />
    <circle cx="34" cy="38" r="3" fill="#9CA3AF" />
    <path d="M6 24H42" stroke="#9CA3AF" strokeWidth="1.5" />
    <rect x="10" y="16" width="8" height="6" fill="#9CA3AF" opacity="0.4" />
    <rect x="20" y="16" width="8" height="6" fill="#9CA3AF" opacity="0.4" />
    <rect x="30" y="16" width="8" height="6" fill="#9CA3AF" opacity="0.4" />
  </svg>
);

export const CourierIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <rect
      x="14"
      y="10"
      width="20"
      height="24"
      rx="2"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <path d="M14 20H34" stroke="#9CA3AF" strokeWidth="1.5" />
    <path d="M24 10V34" stroke="#9CA3AF" strokeWidth="1.5" />
    <path d="M18 34L24 38L30 34" stroke="#9CA3AF" strokeWidth="2" />
  </svg>
);

export const BlackIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 22L10 12H38L42 22V36H6V22Z"
      fill="#000000"
      stroke="#000000"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="33" r="3" fill="#9CA3AF" />
    <circle cx="35" cy="33" r="3" fill="#9CA3AF" />
    <path d="M10 22H38V29H10V22Z" fill="#1F2937" opacity="0.6" />
    <path d="M38 12L42 16" stroke="#9CA3AF" strokeWidth="1.5" />
  </svg>
);

export const PetIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 22L10 13H38L42 22V36H6V22Z"
      fill="#000000"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="33" r="3" fill="#9CA3AF" />
    <circle cx="35" cy="33" r="3" fill="#9CA3AF" />
    <ellipse cx="24" cy="16" rx="4" ry="5" fill="#9CA3AF" />
    <circle cx="20" cy="12" r="2" fill="#9CA3AF" />
    <circle cx="28" cy="12" r="2" fill="#9CA3AF" />
    <circle cx="18" cy="18" r="1.5" fill="#9CA3AF" />
    <circle cx="30" cy="18" r="1.5" fill="#9CA3AF" />
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
