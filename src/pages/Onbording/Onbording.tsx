import React, { useState } from "react"
import { SliderSettings, SliderSlick } from "../../components/Slider/Slider"
import { SliderItem } from "../../components/SliderItem/SliderItem"
import { Image1 } from "../../components/svg/Image1/Image1"
import { Image2 } from "../../components/svg/Image2/Image2"
import { Image3 } from "../../components/svg/Image3/Image3"

type OnbordingProps = {}

export const Onbording = ({}: OnbordingProps) => {
  const [index, setIndex] = useState<{ activeSlide2: number }>({ activeSlide2: 0 })

  const settings: SliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    afterChange: (current) => setIndex({ activeSlide2: current }),
  }
  type TOnboardinInfo = {
    image?: React.ReactNode
    title?: string
    subtitle?: string
  }

  const onboardInfo: TOnboardinInfo[] = [
    { image: <Image1 />, title: "Organize suas tarefas", subtitle: "Voê pode facilmente organizar as suas tarefas no nosso APP de GRAÇA!" },
    { image: <Image2 />, title: "Crie rotinas diárias", subtitle: "No nosso APP, você pode personalizar a sua rotina para ficar produtiva" },
    { image: <Image3 />, title: "Organize suas tarefas", subtitle: "Você pode personalizar as suas tarefas diarias adicionando suas tarefas em categorias diferentes" },
  ]
  return (
    <div className="container">
      <SliderSlick settings={settings} index={index}>
        {onboardInfo.map((info) => (
          <SliderItem image={info.image} title={info.title} subtitle={info.subtitle} key={info.title} />
        ))}
      </SliderSlick>
    </div>
  )
}
