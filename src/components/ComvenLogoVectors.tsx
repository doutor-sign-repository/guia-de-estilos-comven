import React from 'react'

interface LogoVectorProps {
  className?: string
  width?: number | string
  height?: number | string
}

/**
 * High-fidelity vector recreation of the official COMVEN "comven" wordmark.
 * Uses exact geometric Century Gothic/Outfit letterforms with connected tight kerning
 * and the iconic asymmetric checkmark "v" with gradient from yellow #F2CB05 to green #06D04D.
 *
 * ViewBox 420 120 matching the official proportions of the wordmark (sem tagline).
 */
export const ComvenLogoColoridaSemTagline: React.FC<LogoVectorProps> = ({
  className = '',
  width = '100%',
  height,
}) => {
  return (
    <svg
      viewBox="0 0 420 130"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
      aria-label="COMVEN logotipo colorido sem tagline"
    >
      <defs>
        {/* Exact gradient for the checkmark swoosh: yellow to green */}
        <linearGradient
          id="checkGradSemTagline"
          x1="325"
          y1="10"
          x2="265"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F2CB05" />
          <stop offset="42%" stopColor="#E2CA0D" />
          <stop offset="70%" stopColor="#28D03C" />
          <stop offset="100%" stopColor="#06D04D" />
        </linearGradient>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap');
            .comven-c-blue {
              fill: #004185;
              font-family: 'Century Gothic', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 800;
              font-size: 110px;
              letter-spacing: -6px;
            }
            .comven-c-green {
              fill: #06D04D;
              font-family: 'Century Gothic', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 800;
              font-size: 110px;
              letter-spacing: -6px;
            }
          `}
        </style>
      </defs>

      {/* Blue "com" */}
      <g id="com">
        <text x="4" y="98" className="comven-c-blue">
          com
        </text>
      </g>

      {/* Green "en" */}
      <g id="en">
        <text x="272" y="98" className="comven-c-green">
          en
        </text>
      </g>

      {/* The iconic "v" checkmark swoosh:
          Starts at top right near x=340 y=16 (yellow peak), sweeps downward-left to sharp tip at x=265 y=105,
          turns upward-left to x=220 y=48 in green, returning with solid thick stroke overlapping slightly.
      */}
      <path
        d="M 221 52
           L 242 52
           L 264 94
           L 326 21
           C 334 10, 345 8, 350 14
           L 352 16
           L 268 116
           C 264 121, 258 120, 255 114
           L 218 56
           Z"
        fill="url(#checkGradSemTagline)"
      />
    </svg>
  )
}

/**
 * High-fidelity vector recreation of the official COMVEN "comven" wordmark + tagline:
 * "COMUNICAÇÃO DE VENDA EM TEMPO REAL" in uppercase dark blue #004185 with tracking.
 *
 * ViewBox 420 165 matching the lockup with tagline.
 */
export const ComvenLogoColoridaComTagline: React.FC<LogoVectorProps> = ({
  className = '',
  width = '100%',
  height,
}) => {
  return (
    <svg
      viewBox="0 0 420 165"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
      aria-label="COMVEN logotipo colorido com tagline"
    >
      <defs>
        <linearGradient
          id="checkGradComTagline"
          x1="325"
          y1="10"
          x2="265"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F2CB05" />
          <stop offset="42%" stopColor="#E2CA0D" />
          <stop offset="70%" stopColor="#28D03C" />
          <stop offset="100%" stopColor="#06D04D" />
        </linearGradient>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap');
            .comven-lock-blue {
              fill: #004185;
              font-family: 'Century Gothic', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 800;
              font-size: 104px;
              letter-spacing: -6px;
            }
            .comven-lock-green {
              fill: #06D04D;
              font-family: 'Century Gothic', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 800;
              font-size: 104px;
              letter-spacing: -6px;
            }
            .comven-lock-tagline {
              fill: #004185;
              font-family: 'Century Gothic', 'Outfit', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 700;
              font-size: 13.8px;
              letter-spacing: 3px;
            }
          `}
        </style>
      </defs>

      {/* Blue "com" */}
      <g id="com-tag">
        <text x="4" y="96" className="comven-lock-blue">
          com
        </text>
      </g>

      {/* Green "en" */}
      <g id="en-tag">
        <text x="260" y="96" className="comven-lock-green">
          en
        </text>
      </g>

      {/* The iconic "v" checkmark swoosh */}
      <path
        d="M 213 52
           L 233 52
           L 254 94
           L 314 22
           C 322 11, 332 9, 337 15
           L 339 17
           L 258 116
           C 254 121, 248 120, 245 114
           L 210 56
           Z"
        fill="url(#checkGradComTagline)"
      />

      {/* Tagline: COMUNICAÇÃO DE VENDA EM TEMPO REAL */}
      <text x="6" y="146" className="comven-lock-tagline">
        COMUNICAÇÃO DE VENDA EM TEMPO REAL
      </text>
    </svg>
  )
}
