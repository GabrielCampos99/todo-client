type SliderItemProps = {
  image?: React.ReactNode
  title?: string
  subtitle?: string
}

export const SliderItem = ({image, subtitle, title}: SliderItemProps) => {
  return <div className="slider-container">
    <div className="slider-img">{image}</div>
    <div className="slider-title">{title}</div>
    <div className="slider-subtitle">{subtitle}</div>
  </div>
}