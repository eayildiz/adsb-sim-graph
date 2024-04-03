import axios from "axios";
import maplibregl from 'maplibre-gl';
import React, {useState, useEffect, useRef} from 'react';

const MapComponent = ({opcode ,baseRange, baseLat, baseLong, latSlide, 
    longSlide, startSim, flightName, handleData, reset, handleLiveData}) => {

    const mapContainer = useRef(null);
    
    const [mapInstance, setMapInstance] = useState(null)
    const [entered, setEntered] = useState(false)
    const [features,setFeatures] = useState([])
    const [original, setOriginal] = useState([])
    const [modified, setModified] = useState([])

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
            features: original
          }
        });

        mapInstance.addSource('modified-data', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: modified
            }
        });
        
        mapInstance.addLayer({
          id: 'dynamic-data',
          type: 'circle',
          source: 'dynamic-data',
          paint: {
            'circle-color': '#1677ff',
            'circle-radius': 6,
            'circle-opacity': 0.8,
          }
        });

        mapInstance.addLayer({
            id: 'modified-data',
            type: 'circle',
            source: 'modified-data',
            paint: {
              'circle-color': '#ff0000',
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
        
        return () => { map.remove() };
    }, []);

    useEffect(() => {
        if (!mapInstance) return;

        const fetchData = async () => {

            if(reset){
                const response = await axios.get("/reset");
                reset = false;
            }

            if(opcode == 0 && startSim == 1){
                const requestString = `?type=${opcode}&latr=${latSlide}&lngr=${longSlide}&icao=${flightName}`

                try {
                    const response = await axios.post(requestString);
                    const data = response.data.flights;
                    const elapsedTime = response.data.time

                    const geojsonFeatures = data.flatMap(flightGroup => {
                        return flightGroup.map(segment => {
                            return segment.map(flight => ({
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [flight.longitude, flight.latitude]
                                },
                                properties: {
                                    time: elapsedTime
                                }
                            }));
                        });
                    }).flat();
                    console.log(geojsonFeatures)

                    setEntered(true)

                    const midpoint = geojsonFeatures.length / 2;
                    const firstHalf = geojsonFeatures.slice(0, midpoint);
                    const secondHalf = geojsonFeatures.slice(midpoint);

                    setOriginal(firstHalf)
                    setModified(secondHalf)
                    updateFeatures(geojsonFeatures);
                } catch (err) {
                    //console.error("Error While Getting Data", err);
                }

            }
            
            if(opcode == 1 && startSim == 1){
                const requestString = `?type=${opcode}&latr=${latSlide}&lngr=${longSlide}&lat=${baseLat}&lon=${baseLong}&rad=${baseRange}`
                
                try {
                    const response = await axios.post(requestString);
                    handleLiveData(response.data.live)
                    const data = response.data.flights;

                    const geojsonFeatures = data.flatMap(flightGroup => {
                        return flightGroup.map(segment => {
                            return segment.map(flight => ({
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [flight.longitude, flight.latitude]
                                }
                            }));
                        });
                    }).flat();

                    setEntered(true)

                    const midpoint = geojsonFeatures.length / 2;
                    const firstHalf = geojsonFeatures.slice(0, midpoint);
                    const secondHalf = geojsonFeatures.slice(midpoint);

                    setOriginal(firstHalf)
                    setModified(secondHalf)
                    updateFeatures(geojsonFeatures);
                } catch (err) {
                    //console.error("Error While Getting Data", err);
                }
            }
        };

        fetchData()
        const interval = setInterval(fetchData, 12000)

        if(!startSim && entered){
            clearInterval(interval)
            setEntered(false)
        }

        return (() => { clearInterval(interval) })
    }, [startSim, opcode, mapInstance]);

    useEffect(() => {
        if (!mapInstance || features.length === 0){
            return;
        } 

        if (!mapInstance.getSource('dynamic-data') && !mapInstance.getSource('modified-data') ) {
            addSourceAndLayer()
            handleData(features)
        } else {
            mapInstance.getSource('dynamic-data').setData({
                type: 'FeatureCollection',
                features: original
            });

            mapInstance.getSource('modified-data').setData({
                type: 'FeatureCollection',
                features: modified
            });

            handleData(features)
        }
    }, [features]);

    return <div className="MapPart" ref={mapContainer}/>;
}

export default MapComponent;