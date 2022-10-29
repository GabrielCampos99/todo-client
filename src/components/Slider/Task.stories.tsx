import React from 'react';
import { action } from '@storybook/addon-actions';
import { Slider, SliderSettings } from './Slider';
import './styles.scss'


export default {
  component: Slider,
  title: 'Slider/Slider',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



export const Horizontal = () => <Slider settings={settings}>
    <div className='sliderChildren'>1</div>
    <div className='sliderChildren'>2</div>
    <div className='sliderChildren'>3</div>
    <div className='sliderChildren'>4</div>
    <div className='sliderChildren'>5</div>
    <div className='sliderChildren'>6</div>
    <div className='sliderChildren'>7</div>
    <div className='sliderChildren'>8</div>
    <div className='sliderChildren'>9</div>
</Slider>;
