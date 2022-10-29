import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"
import SlickSlider, { Settings } from "react-slick"
import { routesPath } from "../../constants/routes"
import { Button } from "../Button/Button"
import * as S from "./styles"

export type SliderSettings = Settings

export type SliderProps = {
  children?: React.ReactNode
  settings?: SliderSettings
  index: { activeSlide2: number }
}

export const SliderSlick = ({ children, settings, index }: SliderProps) => {
  const navigate = useNavigate()
  const sliderRef = useRef<Slider | null>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  const signUp = () => {
    console.log('cliquei aqui')
    navigate(`${routesPath.singIn}`)
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
          <Button styledType="submit" onClick={signUp}>
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
