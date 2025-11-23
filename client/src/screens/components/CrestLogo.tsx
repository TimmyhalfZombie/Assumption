type CrestLogoProps = {
  className?: string
  size?: number
}

const CrestLogo = ({ className = '', size }: CrestLogoProps) => {
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

