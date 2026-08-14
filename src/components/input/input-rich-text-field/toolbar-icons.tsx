import React from 'react';

type TToolbarIconProps = {
  width?: string | number;
  height?: string | number;
};

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const BoldIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
    <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
  </svg>
);

export const ItalicIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

export const UnderlineIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <line x1="4" y1="20" x2="20" y2="20" />
  </svg>
);

export const StrikeIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <path d="M16 4H9a3 3 0 0 0-2.83 4" />
    <path d="M14 12a4 4 0 0 1 0 8H6" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

export const CodeIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const ListIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export const OrderedListIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <line x1="10" y1="6" x2="21" y2="6" />
    <line x1="10" y1="12" x2="21" y2="12" />
    <line x1="10" y1="18" x2="21" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

export const QuoteIcon = ({
  width = '1em',
  height = '1em',
}: TToolbarIconProps) => (
  <svg width={width} height={height} {...iconProps} aria-hidden>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
  </svg>
);
