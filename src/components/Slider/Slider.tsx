import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import SlickSlider, { Settings } from "react-slick"
import { Button } from "../Button/Button"
import * as S from "./styles"

export type SliderSettings = Settings

export type SliderProps = {
  children?: React.ReactNode
  settings?: SliderSettings
  index: { activeSlide2: number }
}

export const SliderSlick = ({ children, settings, index }: SliderProps) => {
  const sliderRef = useRef<Slider | null>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  

  return (
    <S.Wrapper>
      <SlickSlider {...settings} ref={sliderRef}>
        {children}
      </SlickSlider>
      <S.ButtonBox>
        {index.activeSlide2 === 0 ? (
          <Button styledType="cancel" onClick={gotoPrev} style={{ visibility: "hidden" }}>
            Anterior
          </Button>
        ) : (
          <Button styledType="cancel" onClick={gotoPrev}>
            Anterior
          </Button>
        )}

        {index.activeSlide2 === 2 ? (
          <Button styledType="submit" >
            Começar
          </Button>
        ) : (
          <Button styledType="submit" onClick={gotoNext}>
            Próximo
          </Button>
        )}
      </S.ButtonBox>
    </S.Wrapper>
  )
}
