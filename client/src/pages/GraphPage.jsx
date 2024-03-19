import React, {useState, useEffect, useRef} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const GraphPage = ({data}) => {
    
    const [dataWithId, setDataWithId] = useState([])

    const addIdToData = (data) => {
        return data.map((point, index) => {
          return { ...point, id: index + 1 }; // Adding id dynamically
        });
    };

    useEffect(() => {
        const strippedCoordinates = data.map(data => data.geometry.coordinates);
        setDataWithId(addIdToData(strippedCoordinates))
    },[data])

    useEffect(() => {
        console.log(dataWithId)
    },[dataWithId])
    
    return(
        <div className="GraphContainer">
            <div className='GraphCardBorder'>
              <ResponsiveContainer width="90%" height="85%">
                <ScatterChart
                width={600}
                height={600}
                margin={{
                  top: 20, 
                  right: 40, 
                  bottom: 40, 
                  left: 20,
                }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="1" type="number" name="Latitude" unit="°" label={{value: "Latitude", position: 'insideBottom', offset: -20}}/>
                  <YAxis dataKey="0" type="number" name="Longitude" unit="°" label={{value: "Longitude", position: 'insideTop', offset: -20}}/>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />


                  <Scatter name="Flights" data={dataWithId} fill="#1677ff" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GraphPage;