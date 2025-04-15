import React from 'react';

interface IconProps {
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

const SoundIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'white', className = '' }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 122.88 95.13"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path
                fill={color}
                d="M100.95,23.32c0-2.09,1.69-3.78,3.78-3.78c2.09,0,3.78,1.69,3.78,3.78v48.5c0,2.09-1.69,3.78-3.78,3.78 c-2.09,0-3.78-1.69-3.78-3.78V23.32L100.95,23.32z M0,31.82c0-2.09,1.69-3.78,3.78-3.78c2.09,0,3.78,1.69,3.78,3.78v31.49 c0,2.09-1.69,3.78-3.78,3.78C1.69,67.09,0,65.4,0,63.31V31.82L0,31.82z M14.42,23.32c0-2.09,1.69-3.78,3.78-3.78 c2.09,0,3.78,1.69,3.78,3.78v48.5c0,2.09-1.69,3.78-3.78,3.78c-2.09,0-3.78-1.69-3.78-3.78V23.32L14.42,23.32z M28.9,13.9 c0-2.08,1.67-3.76,3.72-3.76c2.06,0,3.72,1.68,3.72,3.76v67.34c0,2.08-1.67,3.76-3.72,3.76c-2.06,0-3.72-1.68-3.72-3.76V13.9 L28.9,13.9z M43.26,3.78c0-2.09,1.69-3.78,3.78-3.78c2.09,0,3.78,1.69,3.78,3.78v87.57c0,2.09-1.69,3.78-3.78,3.78 c-2.09,0-3.78-1.69-3.78-3.78V3.78L43.26,3.78z M86.53,31.82c0-2.09,1.69-3.78,3.78-3.78c2.09,0,3.78,1.69,3.78,3.78v31.49 c0,2.09-1.69,3.78-3.78,3.78c-2.09,0-3.78-1.69-3.78-3.78V31.82L86.53,31.82z M72.11,23.32c0-2.09,1.69-3.78,3.78-3.78 c2.09,0,3.78,1.69,3.78,3.78v48.5c0,2.09-1.69,3.78-3.78,3.78c-2.09,0-3.78-1.69-3.78-3.78V23.32L72.11,23.32z M57.74,13.9 c0-2.08,1.67-3.76,3.72-3.76c2.06,0,3.72,1.68,3.72,3.76v67.34c0,2.08-1.67,3.76-3.72,3.76c-2.06,0-3.72-1.68-3.72-3.76V13.9 L57.74,13.9z M115.43,13.9c0-2.08,1.67-3.76,3.72-3.76c2.06,0,3.72,1.68,3.72,3.76v67.34c0,2.08-1.67,3.76-3.72,3.76 c-2.06,0-3.72-1.68-3.72-3.76V13.9L115.43,13.9z"
            />
        </g>
    </svg>
);

const VoiceIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'white', className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width} className={className}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            fill={color}
            d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
        />
    </svg>
)

export { SoundIcon, VoiceIcon };
