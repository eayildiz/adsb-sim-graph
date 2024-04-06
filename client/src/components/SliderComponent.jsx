import React from 'react';
import { Button, Radio, Input } from 'antd';
import Slider from '@mui/material/Slider';


const SliderComponent = ({disabled, handleLongSlider, handleLatSlider, startSim}) => {
    return(
        <div style={{width: "100%", marginTop: "5%"}}>
            <div className='SliderCard'>
              <p>Latitude</p>
              <Slider aria-label="Default" 
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              defaultValue={0} 
              max={1}
              min={-1}  
              step={0.01}
              disabled={disabled || startSim} 
              onChange={handleLatSlider}
              style={{width:"80%"}}/>
            </div>

            <div className='SliderCard'>
              <p>Longitude</p>
              <Slider aria-label="Default" 
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              defaultValue={0} 
              min={-1} 
              max={1} 
              step={0.01}
              disabled={disabled || startSim}
              onChange={handleLongSlider} 
              style={{width:"80%"}}/>
            </div>
        </div> 
    );
}

export default SliderComponent;