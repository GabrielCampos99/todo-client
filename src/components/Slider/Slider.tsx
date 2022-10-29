import React from "react"
import SlickSlider, { Settings } from "react-slick"


export type SliderSettings = Settings

export type SliderProps = {
  children?: React.ReactNode
  settings?: SliderSettings
}

export const Slider = ({children, settings}: SliderProps) => {

  return (
    <div>
      <SlickSlider {...settings}>{children}</SlickSlider>
    </div>
  )
}
