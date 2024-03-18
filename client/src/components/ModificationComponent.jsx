import React from 'react';
import { Button, Radio, Input } from 'antd';
import Slider from '@mui/material/Slider';
import SliderComponent from './SliderComponent';

const ModificationComponent = ({changeSettings, preSettingsValue, disabled, 
  toggleDisabled, changePreSettingsText, currentString, handleOpcode, 
  handleBaseRange, handleBaseLat, handleBaseLong, handleRangeSlider, 
  handleLongSlider, handleLatSlider, isStarted, startSim, isFinished, handleFlightName}) => {
    return(
        <div className='ModificationContainer'>
            <div className='ModificationBorder'>
              <div className='ModificationSettings'>
                <Radio.Group onChange={changeSettings} value={preSettingsValue} style={{marginTop: 8}}>
                  <Radio value={0} disabled={disabled} onClick={handleOpcode}>Find by Flight Name</Radio>
                  <Radio value={1} disabled={disabled} onClick={handleOpcode}>Find by Range</Radio>
                </Radio.Group>
        
                {preSettingsValue === 0 ? 
                  <Input placeholder="Flight Name as Icao" className='FlightNameInput' disabled={disabled} onChange={handleFlightName}/> 
                : 
                  <div className="RangeInputs">
                    <Input placeholder="Range in Nautical Mile (max 250)" disabled={disabled} onChange={handleBaseRange}/>
                    <Input placeholder="Longitude" disabled={disabled} onChange={handleBaseLong} style={{marginTop: "4px"}}/>
                    <Input placeholder="Latitude" disabled={disabled} onChange={handleBaseLat} style={{marginTop: "4px"}}/>
                  </div>
                }
        
                <Button type="primary" onClick={() => {
                    toggleDisabled();
                    changePreSettingsText();
                  }}
                  disabled={startSim} 
                >
                  {currentString}
                </Button>
                      
              </div>
              <div className='ModifyBy'>
                <SliderComponent disabled={!disabled} 
                handleRangeSlider={handleRangeSlider} 
                handleLatSlider={handleLatSlider} 
                handleLongSlider={handleLongSlider}
                startSim={startSim}
                />
                {!startSim ?
                  <Button type="primary" style={{marginTop:"25%"}} disabled={!disabled} onClick={isStarted}>Apply Changes</Button>  
                :
                  <Button type="primary" style={{marginTop:"25%"}} disabled={!disabled} onClick={isFinished}>Stop Changes</Button>  
                }
                
              </div>
            </div>
        </div>
    );
    
}

export default ModificationComponent