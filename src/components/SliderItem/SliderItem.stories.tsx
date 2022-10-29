import React from "react"
import { Image1 } from "../svg/Image1/Image1"
import { SliderItem } from "./SliderItem"
import "./style.scss"


export default {
  component: SliderItem,
  title: "Slider/SliderItem",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

export const Default = () => <SliderItem image={<Image1/>} title="titulo" subtitle="subtitulo"/>
