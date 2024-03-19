import React, {useState, useEffect, useRef} from 'react';
import { Button, Radio, Input } from 'antd';
import MapComponent from '../components/MapComponent';
import ModificationComponent from '../components/ModificationComponent';


const SimulationPage = ({disabled, preSettingsValue, changeSettings, toggleDisabled, changePreSettingsText, currentString, handleData}) => {
    
    const [latitudeRangeSlider, setLatitudeRangeSlider] = useState(0)
    const [longitudeSliderValue, setLongitudeSliderValue] = useState(0)

    const [flightName, setFlightName] = useState(" ")

    const [baseRange, setBaseRange] = useState(0)
    const [baseLatitude, setBaseLatitude] = useState(0)
    const [baseLongitude, setBaseLongitude] = useState(0)
    const [opcode, setOpcode] = useState(0)
    const [startSim, setStartSim] = useState(false)


    const handleOpcode = (e) => { setOpcode(e.target.value) }

    const handleBaseRange = (e) => { 
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value > 0){ 
        setBaseRange(value)
      }
    }

    const handleBaseLatitude = (e) => { 
      const value = parseFloat(e.target.value);
      if (!isNaN(value)){ 
        setBaseLatitude(value)
      }
    }

    const handleBaseLongitude = (e) => { 
      const value = parseFloat(e.target.value);
      if (!isNaN(value)){ 
        setBaseLongitude(value)
      }
    }

    const handleLatSlider = (e) => { 
      const value = parseFloat(e.target.value);
      if (!isNaN(value)){ 
        setLatitudeRangeSlider(value)
      }
    }

    const handleLongSlider = (e) => { 
      const value = parseFloat(e.target.value);
      if (!isNaN(value)){ 
        setLongitudeSliderValue(value)
      }
    }

    const handleFlightName = (e) => {
      setFlightName(e.target.value)
    }

    const isStarted = () => {
      setStartSim(true)
    }

    const isFinished = () => {
      setStartSim(false)
    }

    return(
        <div className="SimContainer">
            <ModificationComponent disabled={disabled} currentString={currentString} preSettingsValue={preSettingsValue}
                toggleDisabled={toggleDisabled} changeSettings={changeSettings} changePreSettingsText={changePreSettingsText}
                handleOpcode={handleOpcode} handleBaseRange={handleBaseRange} handleBaseLat={handleBaseLatitude} handleBaseLong={handleBaseLongitude}
                handleLatSlider={handleLatSlider} handleLongSlider={handleLongSlider} 
                startSim={startSim} isStarted={isStarted} isFinished={isFinished} handleFlightName={handleFlightName}
            />

            <div className="MapContainer">
              <div className="MapBorder">
                <MapComponent baseRange={baseRange} baseLat={baseLatitude} flightName={flightName} startSim={startSim}
                baseLong={baseLongitude} opcode={opcode} 
                latSlide={latitudeRangeSlider} longSlide={longitudeSliderValue} handleData={handleData}/>
              </div>
            </div>
        </div>
    );
}
export default SimulationPage;