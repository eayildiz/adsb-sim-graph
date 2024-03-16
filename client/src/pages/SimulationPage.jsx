import React, {useState, useEffect, useRef} from 'react';
import { Button, Radio, Input } from 'antd';
import MapContainer from '../components/MapComponent';
import ModificationComponent from '../components/ModificationComponent';


const SimulationPage = ({disabled, preSettingsValue, changeSettings, toggleDisabled, changePreSettingsText, currentString}) => {
    return(
        <div className="SimContainer">
            <ModificationComponent disabled={disabled} currentString={currentString} preSettingsValue={preSettingsValue}
                toggleDisabled={toggleDisabled} changeSettings={changeSettings} changePreSettingsText={changePreSettingsText}
            />

            <div className="MapContainer">
              <div className="MapBorder">
                <MapContainer/>
              </div>
            </div>
        </div>
    );
}
export default SimulationPage;