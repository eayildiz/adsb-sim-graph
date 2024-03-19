import React, {useState} from 'react';
import SimulationPage from './SimulationPage';
import GraphPage from './GraphPage';
import GithubLogo from '../github-mark-white.svg';

import '../styles/App.css';

function App() {
  const [disabled, setDisabled] = useState(false)
  const [preSettingsValue, setPreSettingsValue] = useState(0)
  const [data, setData] = useState([])
  const [preSettingsText, setPreSettingsText] = useState("Revert Pre Settings")
  const [currentPage, setCurrentPage] = useState(0)

  const currentString = preSettingsText === "Revert Pre Settings" ? "Apply Pre Settings" : "Revert Pre Settings";

  const toggleDisabled = () => {
    setDisabled(!disabled)
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


  return (
    <div className="App">
      <div className="HeaderContainer">
        <div className='HeaderList'>
          <div className="CustomButton" onClick={() => changeCurrentPage(0)}>Simulation</div>
          <div className="CustomButton" onClick={() => changeCurrentPage(1)}>Graph</div>
          <div className="CustomButton" onClick={() => {
            window.open('https://github.com/TOBB-ETU-BIL481-SPRING-24/CyberCoders', '_blank');
          }}>
            <img src={GithubLogo} style={{width:"30%"}}/>
          </div>
        </div>
      </div>

      <div className="ContentContainer">
        {currentPage === 0 ? <SimulationPage disabled={disabled} currentString={currentString} preSettingsValue={preSettingsValue}
        toggleDisabled={toggleDisabled} changeSettings={changeSettings} changePreSettingsText={changePreSettingsText} handleData={handleData}
        /> : <GraphPage data={data}/>
        }
      </div>
    </div>
  );
}

export default App;
