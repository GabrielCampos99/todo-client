import { H1 } from "../Typography/H1/H1"
import { P } from "../Typography/P/P"

type SliderItemProps = {
  image?: React.ReactNode
  title?: string
  subtitle?: string
}

export const SliderItem = ({image, subtitle, title}: SliderItemProps) => {
  return <div className="slider-container">
    <div className="slider-img">{image}</div>
    <H1 className="slider-title">{title}</H1>
    <P className="slider-subtitle">{subtitle}</P>
  </div>
}