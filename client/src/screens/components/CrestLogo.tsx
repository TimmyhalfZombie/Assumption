import { useEffect } from 'react'


type CrestLogoProps = {
  className?: string
  size?: number
}

const CrestLogo = ({ className = '', size }: CrestLogoProps) => {
  useEffect(() => {
    const styleId = 'crest-logo-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  const dimensionStyle = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
      }
    : undefined

  return (
    <span className={`crest-logo ${className}`.trim()} style={dimensionStyle}>
      <img
        src="/assets/images/assumption-logo.png"
        alt="Assumption Iloilo crest"
        className="crest-logo__image"
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}

export default CrestLogo

const CSS = `
.crest-logo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(60px, 9vw, 82px);
  height: clamp(60px, 9vw, 82px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.96);
  overflow: hidden;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

.crest-logo__image {
  width: 94%;
  height: 94%;
  object-fit: contain;
}
`