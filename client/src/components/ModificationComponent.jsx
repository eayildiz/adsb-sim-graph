import React, {useState, useEffect, useRef} from 'react';
import { Button, Radio, Input } from 'antd';


const ModificationComponent = ({changeSettings, preSettingsValue, disabled, toggleDisabled, changePreSettingsText, currentString}) => {
    return(
        <div className='ModificationContainer'>
            <div className='ModificationBorder'>
              <div className='ModificationSettings'>
                <Radio.Group onChange={changeSettings} value={preSettingsValue} style={{marginTop: 8}}>
                  <Radio value={0} disabled={disabled}>Find by Flight Name</Radio>
                  <Radio value={1} disabled={disabled}>Find by Range</Radio>
                </Radio.Group>
        
                {preSettingsValue === 0 ? <Input placeholder="Flight Name" /> : <p>Yoo Bitch</p>}
        
                <Button type="primary" onClick={() => {
                    toggleDisabled();
                    changePreSettingsText();
                  }} 
                >
                  {currentString}
                </Button>
                      
              </div>
              <div className='ModifyBy'>
              
              </div>
            </div>
        </div>
    );
    
}

export default ModificationComponent