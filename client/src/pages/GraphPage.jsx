import React, {useState, useEffect} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const GraphPage = ({data, opcode, liveData, time}) => {
    
    const [liveDataWithId, setLiveDataWithId] = useState([])
    const [dataWithId, setDataWithId] = useState([])
    const [originalLive, setOriginalLive] = useState([])
    const [modifiedLive, setModifiedLive] = useState([])
    const [original, setOriginal] = useState([])
    const [modified, setModified] = useState([])
    const [range, setRange] = useState([])

    const addIdToData = (data) => {
        return data.map((point, index) => {
          return { ...point[0], id: index + 1 , time: point[1]};
        });
    };

    const calculateRange = () => {
      const values = dataWithId.map((item) => [item[0], item[1]]);

      const minValues = values.reduce((acc, curr) => ({
        ...acc,
        0: Math.min(acc[0], curr[0]),
        1: Math.min(acc[1], curr[1]),
      }), { 0: Infinity, 1: Infinity });
    
      const maxValues = values.reduce((acc, curr) => ({
        ...acc,
        0: Math.max(acc[0], curr[0]),
        1: Math.max(acc[1], curr[1]),
      }), { 0: -Infinity, 1: -Infinity });

      const returnedArray = [minValues[0], minValues[1], maxValues[0], maxValues[1]]
      return returnedArray;
    }

    useEffect(() => {
      const strippedCoordinates = data.map(data => [data.geometry.coordinates, data.properties.time]);
      setDataWithId(addIdToData(strippedCoordinates))
    },[data])

    useEffect(() => {
      const middle_point = dataWithId.length/2

      if(opcode == 0){
        setOriginalLive([dataWithId[middle_point-1]])
        setModifiedLive([dataWithId[dataWithId.length-1]])
        setOriginal(dataWithId.slice(0,middle_point))
        setModified(dataWithId.slice(middle_point))
      }else{
        const middle_point_live = liveDataWithId.length/2

        setOriginalLive(liveDataWithId.slice(0,middle_point_live))
        setModifiedLive(liveDataWithId.slice(middle_point_live))
        setOriginal(dataWithId.slice(0,middle_point))
        setModified(dataWithId.slice(middle_point))
      }

      setRange(calculateRange())

      console.log(dataWithId)
    },[dataWithId])
    
    const formatTick = (value) => value.toFixed(1);

    return(
        <div className="GraphContainer">
            <div className='GraphCardBorder' style={{marginRight:"2.5%"}}>
              <ResponsiveContainer width="85%" height="85%">
                <ScatterChart width={600} height={600} margin={{ top: 20, right: 40, bottom: 40, left: 20,}} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" type="number" name="time" unit="s" 
                  label={{value: "Time", position: 'insideBottom', offset: -20}} />

                  <YAxis dataKey="1" type="number" name="Latitude" unit="°" 
                  label={{value: "Latitude", position: 'insideTop', offset: -20}} 
                  domain={[range[1]*0.99, range[3]*1.01]} tickFormatter={formatTick}/>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />

                  <Scatter name="Original" data={original} fill="#1677ff" />
                  <Scatter name="Modified" data={modified} fill="#ff0000" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className='GraphCardBorder'>
              <ResponsiveContainer width="85%" height="85%">
                <ScatterChart width={600} height={600} margin={{ top: 20, right: 40, bottom: 40, left: 20,}} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" type="number" name="Time" unit="s" label={{value: "Time", position: 'insideBottom', offset: -20}}/>
                  <YAxis dataKey="0" type="number" name="Longitude" unit="°" label={{value: "Longitude", position: 'insideTop', offset: -20}} 
                  domain={[range[0]*0.99, range[2]*1.01]} tickFormatter={formatTick}/>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />


                  <Scatter name="Original" data={original} fill="#1677ff"/>
                  <Scatter name="Modified" data={modified} fill="#ff0000" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GraphPage;