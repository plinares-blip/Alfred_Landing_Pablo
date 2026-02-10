'use client';

import React from 'react';

interface CarBlueprintProps {
  highlight: 'engine' | 'front_wheels' | 'rear_wheels' | 'exhaust' | 'interior' | 'body' | 'undercarriage';
}

const CarBlueprint: React.FC<CarBlueprintProps> = ({ highlight }) => {
  const isHighlight = (area: string) => highlight === area || highlight === 'body';
  
  // Alfred Palette
  const activeColor = "#B4FB00"; // Lime
  const baseColor = "#0096FB";   // Blue
  
  return (
    <div className="relative w-full h-48 md:h-64 flex items-center justify-center p-4">
      {/* Abstract Grid - Ghostly */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-alfred-blue/10 via-transparent to-transparent opacity-50"></div>
      
      <svg viewBox="0 0 200 400" className="h-full w-auto transition-all duration-1000 ease-in-out transform hover:scale-105">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* Chassis - Ghostly Outline */}
            <path 
                d="M40 80 L40 320 Q40 360 100 360 Q160 360 160 320 L160 80 Q160 40 100 40 Q40 40 40 80 Z" 
                stroke={isHighlight('body') ? activeColor : baseColor}
                strokeOpacity={isHighlight('body') ? "1" : "0.3"}
                fill={isHighlight('body') ? "rgba(180, 251, 0, 0.05)" : "none"}
                filter={isHighlight('body') ? "url(#glow)" : ""}
            />

            {/* Interior Space */}
            <path 
                d="M50 110 L150 110 L150 290 L50 290 Z" 
                stroke={isHighlight('interior') ? activeColor : baseColor}
                strokeOpacity={isHighlight('interior') ? "1" : "0.2"}
                fill={isHighlight('interior') ? "rgba(180, 251, 0, 0.1)" : "none"}
            />

            {/* Wheels - Front */}
            <g 
                stroke={isHighlight('front_wheels') ? activeColor : baseColor}
                strokeOpacity={isHighlight('front_wheels') ? "1" : "0.3"}
                fill={isHighlight('front_wheels') ? activeColor : "none"}
                fillOpacity="0.1"
                filter={isHighlight('front_wheels') ? "url(#glow)" : ""}
            >
                <rect x="20" y="60" width="20" height="40" rx="4" />
                <rect x="160" y="60" width="20" height="40" rx="4" />
                {/* Axle connection */}
                <line x1="40" y1="80" x2="160" y2="80" strokeDasharray="2 4" />
            </g>

            {/* Wheels - Rear */}
            <g 
                stroke={isHighlight('rear_wheels') ? activeColor : baseColor}
                strokeOpacity={isHighlight('rear_wheels') ? "1" : "0.3"}
                fill={isHighlight('rear_wheels') ? activeColor : "none"}
                fillOpacity="0.1"
                filter={isHighlight('rear_wheels') ? "url(#glow)" : ""}
            >
                <rect x="20" y="300" width="20" height="40" rx="4" />
                <rect x="160" y="300" width="20" height="40" rx="4" />
                <line x1="40" y1="320" x2="160" y2="320" strokeDasharray="2 4" />
            </g>

            {/* Engine Core - The Heart */}
            <path 
                d="M60 50 H140 V100 H60 Z" 
                stroke={isHighlight('engine') ? activeColor : baseColor}
                strokeOpacity={isHighlight('engine') ? "1" : "0.3"}
                fill={isHighlight('engine') ? activeColor : "none"}
                fillOpacity="0.2"
                filter={isHighlight('engine') ? "url(#glow)" : ""}
            />

            {/* Exhaust */}
            <path 
                d="M100 100 V360 M90 360 H110" 
                stroke={isHighlight('exhaust') || isHighlight('undercarriage') ? activeColor : baseColor}
                strokeOpacity={isHighlight('exhaust') ? "1" : "0.3"}
                strokeWidth={isHighlight('exhaust') ? "3" : "1.5"}
                filter={isHighlight('exhaust') ? "url(#glow)" : ""}
            />

            {/* Undercarriage Details */}
             <circle cx="100" cy="320" r="12" 
                 stroke={isHighlight('undercarriage') ? activeColor : baseColor} 
                 strokeOpacity={isHighlight('undercarriage') ? "1" : "0.3"}
                 fill={isHighlight('undercarriage') ? activeColor : "none"}
                 fillOpacity="0.2"
             />
        </g>
        
        {/* Pulse Effect for Highlighted Part */}
        {highlight !== 'body' && (
           <circle cx="100" cy="200" r="100" stroke={activeColor} strokeWidth="1" fill="none" opacity="0">
              <animate attributeName="r" from="0" to="120" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
           </circle>
        )}
      </svg>
    </div>
  );
};

export default CarBlueprint;