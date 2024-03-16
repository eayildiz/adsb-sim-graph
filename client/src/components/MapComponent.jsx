import maplibregl from 'maplibre-gl';
import React, {useState, useEffect, useRef} from 'react';

const MapComponent = () => {
    const mapContainer = useRef(null);

    const [viewState, setViewState] = useState({
        center: [0, 0],
        zoom: 2
    })


    useEffect( () => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            ...viewState,
        })
   
        return () => {
            map.remove()
        };
    }, []);

    return <div className="MapPart" ref={mapContainer}/>;
}

export default MapComponent;