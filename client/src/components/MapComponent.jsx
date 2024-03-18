import axios from "axios";
import maplibregl from 'maplibre-gl';
import React, {useState, useEffect, useRef} from 'react';

const MapComponent = ({opcode ,baseRange, baseLat, baseLong, rangeSlide, latSlide, longSlide, startSim, flightName}) => {
    const mapContainer = useRef(null);
    
    const [mapInstance, setMapInstance] = useState(null)
    const [currentRequest, setCurrentRequest] = useState("/")
    const [prevRequest, setPrevRequest] = useState("/")

    const [features,setFeatures] = useState([])
    const [viewState, setViewState] = useState({
        center: [0, 0],
        zoom: 2
    })

    const updateFeatures = (e) => {
        setFeatures(e)
    }

    useEffect( () => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets/style.json?key=FfIDMV5D4UMytNdxSSTq ",
            ...viewState,
        })

        setMapInstance(map)
        
       
        return () => {
            map.remove()
        };
    }, []);

    useEffect(() => {
        if (!mapInstance) return;

        const fetchData = async (request) => {
            try {
                const response = await axios.post(request);
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
        };

        if(startSim){
            if(opcode === 0){
                const typeS = "?type=" + opcode.toString();
                const bodyS = "&latr=" + latSlide.toString() + "&lngr=" + longSlide.toString();
                const icao = "&icao=" + flightName.toString();

                const wholeRequest = typeS + bodyS + icao;


                setCurrentRequest(wholeRequest)

            }else {

            }
            

        }else {

        }

        fetchData(currentRequest);

        const intervalId = setInterval(fetchData(currentRequest), 10000);

                    
        return () => {
            clearInterval(intervalId);
        };

        // Fetch data once when the mapInstance is initialized

         // Fetch data every 10 seconds
    }, [mapInstance, startSim]);

    useEffect(() => {
        if (!mapInstance || features.length === 0) return;

        if (!mapInstance.getSource('dynamic-data')) {
            mapInstance.on('load', () => {
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
            });
        } else {
            mapInstance.getSource('dynamic-data').setData({
                type: 'FeatureCollection',
                features: features
            });
        }
    }, [features]);

    return <div className="MapPart" ref={mapContainer}/>;
}

export default MapComponent;