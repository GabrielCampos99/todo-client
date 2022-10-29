import React from "react"
import { action } from "@storybook/addon-actions"
import { SliderSlick, SliderSettings } from "./Slider"
import './styles.scss'
import { SliderItem } from "../SliderItem/SliderItem"
import { Image1 } from "../svg/Image1/Image1"

export default {
  component: SliderSlick,
  title: "Slider/Slider",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const settings: SliderSettings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}

export const Horizontal = () => (
  <SliderSlick settings={settings}>
    <SliderItem image={<Image1 />} title="titulo1" subtitle="subtitulo" />
  </SliderSlick>
)
