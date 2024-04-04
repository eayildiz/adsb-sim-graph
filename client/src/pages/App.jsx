import React, {useState} from 'react';
import SimulationPage from './SimulationPage';
import GraphPage from './GraphPage';
import GithubLogo from '../github-mark-white.svg';

import '../styles/App.css';

function App() {
  const [disabled, setDisabled] = useState(false)
  const [preSettingsValue, setPreSettingsValue] = useState(0)
  const [data, setData] = useState([])
  const [preSettingsText, setPreSettingsText] = useState("Change Filters")
  const [currentPage, setCurrentPage] = useState(0)
  const [liveData, setLiveData] = useState([])
  const [opcode, setOpcode] = useState(0)
  const [time, setTime] = useState(0)

  const currentString = preSettingsText === "Change Filters" ? "Set Filters" : "Change Filters";

  const toggleDisabled = () => {
    setDisabled(!disabled)
  }

  const handleTime = (e) => {
    console.log(e)
    setTime(e)
  }

  const changeSettings = (e) => {
    setPreSettingsValue(e.target.value)
  }

  const changePreSettingsText = () => {
    setPreSettingsText(currentString)
  }

  const changeCurrentPage = (v) => {
    setCurrentPage(v)
  }

  const handleData = (e) => {
    setData(e);
  }

  const handleOpcode = (e) => {
    setOpcode(e.target.value)
  }

  const handleLiveData = (e) => {
    setLiveData(e)
  }

  return (
    <div className="App">

      <div style={{display:"flex", flexDirection:"column"}}>
        <div className="ContentContainer">
          <SimulationPage disabled={disabled} currentString={currentString} preSettingsValue={preSettingsValue}
          toggleDisabled={toggleDisabled} changeSettings={changeSettings} changePreSettingsText={changePreSettingsText} handleData={handleData}
          handleOpcode={handleOpcode} opcode={opcode} handleLiveData={handleLiveData} handleTime={handleTime} time={time} data={data} liveData={liveData}/>
        </div>

        <div className='ContentContainer'>
          <GraphPage data={data} liveData={liveData} opcode={opcode} time={time}/>
        </div>
      </div>

    </div>
  );
}

export default App;
