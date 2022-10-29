import React, { useRef } from "react"
import Slider from "react-slick"
import SlickSlider, { Settings } from "react-slick"

export type SliderSettings = Settings

export type SliderProps = {
  children?: React.ReactNode
  settings?: SliderSettings
}

export const SliderSlick = ({ children, settings }: SliderProps) => {
  const sliderRef = useRef<Slider | null>(null)
  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }
  return (
    <div>
      <SlickSlider {...settings} ref={sliderRef}>
        {children}
      </SlickSlider>
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={gotoPrev}>
          Previous
        </button>
        <button className="button" onClick={gotoNext}>
          Next
        </button>
      </div>
    </div>
  )
}
