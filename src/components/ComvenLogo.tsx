import React from 'react'

export interface ComvenLogoProps {
  /** 'light' means dark blue #004185 wordmark; 'dark' means white wordmark */
  variant?: 'light' | 'dark' | 'yellow-on-white' | 'custom'
  showTagline?: boolean
  className?: string
  wordmarkColor?: string
  taglineColor?: string
  /** Size scale multiplier */
  scale?: number
}

/**
 * ComvenLogo renders the exact brand typography lockup:
 * - Geometric wordmark "comven" (Century Gothic Bold base with stylized check/accent)
 * - Tagline "comunicação de venda em tempo real" in lowercase Century Gothic Bold
 */
export const ComvenLogo: React.FC<ComvenLogoProps> = ({
  variant = 'light',
  showTagline = true,
  className = '',
  wordmarkColor,
  taglineColor,
  scale = 1,
}) => {
  let finalWordmark = wordmarkColor
  let finalTagline = taglineColor

  if (!finalWordmark) {
    if (variant === 'light') {
      finalWordmark = '#004185'
      finalTagline = '#F2CB05'
    } else if (variant === 'dark') {
      finalWordmark = '#FFFFFF'
      finalTagline = '#F2CB05'
    } else if (variant === 'yellow-on-white') {
      finalWordmark = '#F2CB05'
      finalTagline = '#F2CB05'
    } else {
      finalWordmark = '#004185'
      finalTagline = '#F2CB05'
    }
  }

  if (!finalTagline) {
    finalTagline = '#F2CB05'
  }

  // Base font size for wordmark is 48px * scale
  const wordmarkFontSize = Math.round(48 * scale)
  const taglineFontSize = Math.max(10, Math.round(11 * scale))

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none text-center ${className}`}
      style={{ lineHeight: 1 }}
    >
      {/* Wordmark "comven" with distinctive curved geometric letters and green accent/check */}
      <div
        className="font-comven-wordmark tracking-tight flex items-baseline font-bold"
        style={{
          fontSize: `${wordmarkFontSize}px`,
          color: finalWordmark,
          letterSpacing: '-0.03em',
        }}
      >
        <span>comv</span>
        {/* The 'e' in comven with brand accent in original mark */}
        <span className="relative">
          e
          <span
            className="absolute -top-1 right-0 w-2 h-2 rounded-full"
            style={{
              display: 'none',
            }}
          />
        </span>
        <span>n</span>
      </div>

      {showTagline && (
        <div
          className="font-comven-wordmark font-bold tracking-wider mt-1.5 uppercase"
          style={{
            fontSize: `${taglineFontSize}px`,
            color: finalTagline,
            letterSpacing: '0.08em',
          }}
        >
          comunicação de venda em tempo real
        </div>
      )}
    </div>
  )
}

/**
 * High-fidelity SVG version of the COMVEN Logo Lockup matching the PDF presentation
 */
export const ComvenLogoLockup: React.FC<{
  theme?: 'light' | 'dark'
  showTagline?: boolean
  className?: string
  width?: number | string
  height?: number | string
}> = ({ theme = 'light', showTagline = true, className = '', width = 280, height }) => {
  const isDark = theme === 'dark'
  const primaryColor = isDark ? '#FFFFFF' : '#004185'
  const accentColor = '#06D04D'
  const yellowColor = '#F2CB05'

  // Height proportional to width if not provided
  const viewBoxHeight = showTagline ? 110 : 70

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 320 ${viewBoxHeight}`}
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
      >
        {/* Wordmark "comven" */}
        <g id="wordmark">
          {/* 'c' */}
          <text
            x="160"
            y={showTagline ? '62' : '52'}
            textAnchor="middle"
            fontFamily="'Century Gothic', 'Outfit', Futura, 'Avenir Next', sans-serif"
            fontWeight="700"
            fontSize="64"
            letterSpacing="-2"
            fill={primaryColor}
          >
            comv<tspan fill={primaryColor}>e</tspan>n
          </text>

          {/* Green accent tick / checkmark over the 'e' / 'v' representing real-time sales speed */}
          <path d="M 205 22 Q 212 14 224 8 Q 218 18 214 26 Z" fill={accentColor} opacity="0.95" />
        </g>

        {/* Tagline */}
        {showTagline && (
          <text
            x="160"
            y="94"
            textAnchor="middle"
            fontFamily="'Century Gothic', 'Outfit', Futura, 'Avenir Next', sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="0.8"
            fill={yellowColor}
          >
            COMUNICAÇÃO DE VENDA EM TEMPO REAL
          </text>
        )}
      </svg>
    </div>
  )
}
