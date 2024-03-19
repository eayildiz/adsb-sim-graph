import React, {useState, useEffect, useRef} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


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
            <ScatterChart
              width={700}
              height={700}
              margin={{
                top: 20, right: 40, bottom: 40, left: 20, // Increased right and bottom margins
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="0" type="number" name="Latitude" unit="°" label={{value: "Latitude", position: 'insideBottom', offset: -4}}/>
              <YAxis dataKey="1" type="number" name="Longitude" unit="°" label={{value: "Longitude", position: 'insideMiddle', offset: -30}}/>
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              
              <Scatter name="Flights" data={dataWithId} fill="#8884d8" />
            </ScatterChart>
            </div>
        </div>
    );
}

export default GraphPage;