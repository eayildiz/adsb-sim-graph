import React from 'react';
import { Button, Radio, Input } from 'antd';
import Slider from '@mui/material/Slider';


const SliderComponent = ({disabled, handleLongSlider, handleLatSlider, startSim}) => {
    return(
        <div style={{width: "100%", marginTop: "5%", visibility: startSim ? "hidden": "visible"}}>
            <div className='SliderCard'>
              <p>Latitude</p>
              <Slider aria-label="Default" 
              valueLabelDisplay="auto"
              defaultValue={0} 
              max={10}
              min={-10}  
              step={0.1}
              disabled={disabled} 
              onChange={handleLatSlider}
              style={{width:"80%"}}/>
            </div>

            <div className='SliderCard'>
              <p>Longitude</p>
              <Slider aria-label="Default" 
              valueLabelDisplay="auto"
              defaultValue={0} 
              min={-10} 
              max={10} 
              step={0.1}
              disabled={disabled}
              onChange={handleLongSlider} 
              style={{width:"80%"}}/>
            </div>
        </div> 
    );
}

export default SliderComponent;