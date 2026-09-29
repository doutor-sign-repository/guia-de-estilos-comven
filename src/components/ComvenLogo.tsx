import React from 'react'
import { LOGO_ASSETS } from '@/data/logos'
import { ComvenLogoColoridaSemTagline, ComvenLogoColoridaComTagline } from './ComvenLogoVectors'

export interface ComvenLogoProps {
  /**
   * Variation mode:
   * 'dark' -> official dark mode logo (colorida or 1-color depending on scheme)
   * 'light' -> official light mode logo (colorida or 1-color)
   * 'dark-1cor' -> white monochrome on dark
   * 'light-1cor' -> blue monochrome on light
   * 'dark-colorida' -> official colored version on dark
   * 'light-colorida' -> official colored version on light
   */
  variant?:
    | 'dark'
    | 'light'
    | 'dark-1cor'
    | 'light-1cor'
    | 'dark-colorida'
    | 'light-colorida'
    | 'yellow-on-white'
    | 'custom'
  showTagline?: boolean
  className?: string
  alt?: string
  width?: number | string
  height?: number | string
  scale?: number
  wordmarkColor?: string
  taglineColor?: string
}

/**
 * ComvenOfficialLogo renders the official brand logo using the highest quality asset:
 * - Official PNG uploaded assets for the 6 dark and 1-cor variations
 * - High-fidelity Vector SVGs for the light-colorida variations (com e sem tagline)
 */
export const ComvenOfficialLogo: React.FC<ComvenLogoProps> = ({
  variant = 'dark-colorida',
  showTagline = false,
  className = '',
  alt = 'Logotipo COMVEN',
  width,
  height,
}) => {
  // Normalize variant
  let resolvedVariant = variant
  if (resolvedVariant === 'dark') {
    resolvedVariant = 'dark-colorida'
  } else if (resolvedVariant === 'light') {
    resolvedVariant = 'light-colorida'
  }

  // Render appropriate official asset
  if (resolvedVariant === 'light-colorida') {
    if (showTagline) {
      return (
        <div className={`inline-flex items-center justify-center ${className}`}>
          <ComvenLogoColoridaComTagline width={width || 280} height={height} />
        </div>
      )
    }
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ComvenLogoColoridaSemTagline width={width || 240} height={height} />
      </div>
    )
  }

  if (resolvedVariant === 'light-1cor') {
    const src = showTagline ? LOGO_ASSETS.light1CorComTagline : LOGO_ASSETS.light1CorSemTagline
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`max-w-full h-auto object-contain select-none ${className}`}
        loading="lazy"
      />
    )
  }

  if (resolvedVariant === 'dark-1cor') {
    const src = showTagline ? LOGO_ASSETS.dark1CorComTagline : LOGO_ASSETS.dark1CorSemTagline
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`max-w-full h-auto object-contain select-none ${className}`}
        loading="lazy"
      />
    )
  }

  // Default: dark-colorida (official)
  const src = showTagline ? LOGO_ASSETS.darkColoridaComTagline : LOGO_ASSETS.darkColoridaSemTagline

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`max-w-full h-auto object-contain select-none ${className}`}
      loading="lazy"
    />
  )
}

/**
 * Backward compatible ComvenLogo for sidebar, notfound and headers
 */
export const ComvenLogo: React.FC<ComvenLogoProps> = ({
  variant = 'dark',
  showTagline = false,
  className = '',
  scale = 1,
  width,
  height,
}) => {
  // If variant is dark, default to dark-colorida official logo
  const mappedVariant =
    variant === 'dark' ? 'dark-colorida' : variant === 'light' ? 'light-colorida' : variant

  const defaultWidth = showTagline ? Math.round(240 * scale) : Math.round(180 * scale)

  return (
    <ComvenOfficialLogo
      variant={mappedVariant}
      showTagline={showTagline}
      width={width || defaultWidth}
      height={height}
      className={className}
    />
  )
}

/**
 * ComvenLogoLockup for sections like Área de Proteção and comparisons
 */
export const ComvenLogoLockup: React.FC<{
  theme?: 'light' | 'dark'
  showTagline?: boolean
  className?: string
  width?: number | string
  height?: number | string
}> = ({ theme = 'light', showTagline = true, className = '', width = 280, height }) => {
  return (
    <ComvenOfficialLogo
      variant={theme === 'dark' ? 'dark-colorida' : 'light-colorida'}
      showTagline={showTagline}
      width={width}
      height={height}
      className={className}
    />
  )
}

export { ComvenLogoColoridaComTagline, ComvenLogoColoridaSemTagline }
