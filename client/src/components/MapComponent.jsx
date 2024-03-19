import axios from "axios";
import maplibregl from 'maplibre-gl';
import React, {useState, useEffect, useRef} from 'react';

const MapComponent = ({opcode ,baseRange, baseLat, baseLong, rangeSlide, latSlide, longSlide, startSim, flightName}) => {
    const mapContainer = useRef(null);
    
    const [mapInstance, setMapInstance] = useState(null)

    const [features,setFeatures] = useState([])
    const [viewState, setViewState] = useState({
        center: [0, 0],
        zoom: 2
    })

    const updateFeatures = (e) => {
        setFeatures(e)
    }

    const addSourceAndLayer = () => {
        mapInstance.addSource('dynamic-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        });
        
        mapInstance.addLayer({
          id: 'dynamic-data',
          type: 'circle',
          source: 'dynamic-data',
          paint: {
            'circle-color': 'red',
            'circle-radius': 6,
            'circle-opacity': 0.8,
          }
        });
      }
      

    useEffect( () => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            ...viewState,
        })

        setMapInstance(map)
        
        return () => {
            map.remove()
        };
    }, []);

    useEffect(() => {
        if (!mapInstance) return;

        const fetchData = async () => {
            if(opcode == 0){
                const requestString = `?type=${opcode}&latr=${latSlide}&lngr=${longSlide}&icao=${flightName}`

                try {
                    const response = await axios.post(requestString);
                    const data = response.data.flights;

                    const geojsonFeatures = data.flatMap(flightGroup => {
                        return flightGroup.map(flight => {
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [flight.longitude, flight.latitude]
                                }
                            };
                        });
                    });
                    
                    updateFeatures(geojsonFeatures);
                } catch (err) {
                    //console.error("Error While Getting Data", err);
                }

            }
            
            if(opcode == 1){
                const requestString = `?type=${opcode}&latr=${latSlide}&lngr=${longSlide}&lat=${baseLat}&lon=${baseLong}&rad=${baseRange}`
                
                try {
                    const response = await axios.post(requestString);
                    const data = response.data.flights;
                    
                    const geojsonFeatures = data.flatMap(flightGroup => {
                        return flightGroup.map(flight => {
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [flight.longitude, flight.latitude]
                                }
                            };
                        });
                    });
                    
                    updateFeatures(geojsonFeatures);
                } catch (err) {
                    console.error("Error While Getting Data", err);
                }
            }
        };

        fetchData()
        const interval = setInterval(fetchData, 8000)

        return (() => {
            clearInterval(interval)})
    }, [startSim, opcode, mapInstance]);

    useEffect(() => {
        if (!mapInstance || features.length === 0){
            return;
        } 

        if (!mapInstance.getSource('dynamic-data')) {
            addSourceAndLayer()
        } else {
            console.log(features)
            mapInstance.getSource('dynamic-data').setData({
                type: 'FeatureCollection',
                features: features
            });
        }
    }, [features]);

    return <div className="MapPart" ref={mapContainer}/>;
}

export default MapComponent;