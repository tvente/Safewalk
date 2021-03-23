import React, {useState, useEffect} from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer,
} from 'react-google-maps';
const google = window.google;

// The source and destination coordinates are passed to the map function to render.
function Map() {
    const [directions, updateDirections] = useState({});

    return (
        <div></div>
    )
}
export default Map;