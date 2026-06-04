import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const SendIcon: React.FC<IconProps> = ({ size = 20, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4Z" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ size = 22, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 22, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
