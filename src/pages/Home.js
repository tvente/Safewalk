import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {Select, InputLabel, MenuItem} from '@material-ui/core';
import Search from '../components/Search';
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import userPin from './assets/pin_source.svg';
import destinationPin from './assets/pin_dest.svg';
import spinner from './assets/loading.gif';
import redDot from './assets/red_dot.svg'
import {crimeData} from './assets/crime';

const google = window.google;
function Home() {
    const [origin, updateOrigin] = useState(null);
    const [destination, updateDestination] = useState(null);
    const [directions, updateDirections] = useState(null);
    const [markers, updateMarkers] = useState([]);
    const [map, updateMap] = useState(null);
    const [time, updateTime] = useState("morning");
    const [error, updateError] = useState(null);

    const options = {
        enableHighAccuracy: false,
        maximumAge: 60000,
        timeout: 27000
    };

    const onLoad = React.useCallback(function callback(map) {
        updateMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        updateMap(null)
    }, [])

    useEffect(() => {
        let mounted = true;

        // create a geolocation object
        const geo = navigator.geolocation;
        if(!geo) {
            return;
        }

        // update the position with the user's location
        geo.getCurrentPosition(position => {
            if(mounted) {
                updateOrigin({lat: position.coords.latitude, lng: position.coords.longitude});
                updateError(null);
            }
        },
        error => updateError(error.message), options);

        return () => {
            mounted = false;
        }
    }, [map]);

    // const handleSelectedMarker = (markerId) => {
    //     updateInfoWindow(markerId);
    // } 
    
    const handleDirections = (e) => {
        updateDestination(e.latLng);
        updateMarkers([]);
        // updateInfoWindow(null);
    }

    const handleUpdateMarkers = (markers) => {
        updateDestination(null);
        updateDirections(null);
        updateMarkers(markers);
    }

    const directionsCallback = (directions) => {
        if (directions !== null) {
            if (directions.status === 'OK') {
                updateDirections(directions);
            } else {
                console.log('directions: ', directions)
            }
        }
        updateDestination(null);
    }

    return (
        <Container>
            <div className="time-select">
                <Select value={time} onChange={(e) => updateTime(e.target.value)}>
                    <MenuItem value="morning">Morning (6AM - 12PM)</MenuItem>
                    <MenuItem value="afternoon">Afternoon (12PM - 6PM)</MenuItem>
                    <MenuItem value="evening">Evening (6PM - 12AMM)</MenuItem>
                    <MenuItem value="night">Night (12AM - 6AM)</MenuItem>
                </Select>
            </div>

            <Search
                map={map}
                updateMarkers={handleUpdateMarkers}
                markers={markers}
            />

            {error && (
                <div className="error">{error}</div>
            )}

            {/* If we have the user's position, the default map will render */}
            {origin ? (
                <div className="default-map">
                    <GoogleMap
                        className="default-map"
                        center={ origin }
                        zoom={ 15 }
                        mapElement={ <div style={{ height: `100%` }} /> }
                        mapContainerStyle={{height:`calc(100vh - 35px)`,width:`100vw`,display:'flex',flexDirection:'column-reverse' }}

                        onLoad={event => onLoad(event)}
                        onUnmount={event => onUnmount(event)}
                    >
                    
                    {/* Calculating the route with our origin and destination */
                        (
                            destination !== null &&
                            origin !== null
                        ) && (
                            <DirectionsService
                                options={{
                                    destination,
                                    origin,
                                    travelMode: "WALKING"
                                }}
                                callback={directionsCallback}
                            />
                        )
                    }

                    {/* Render the route */
                        directions !== null && (
                            <DirectionsRenderer
                                options={{directions, draggable: true}}
                            />
                        )
                    }

                    {directions === null &&
                        <Marker 
                            position = {origin}
                            icon = {{url: userPin}}
                        />
                    }

                    {destination === null &&
                        markers.map(marker => (
                            <Marker
                                position={{lat: marker.geometry.location.lat(), lng: marker.geometry.location.lng()}}
                                key={marker.id}
                                icon = {{url: destinationPin}}
                                onClick={handleDirections}
                            >
                            </Marker>
                        ))}

                        {crimeData.filter(marker => marker.time === time).map(marker => (
                            <Marker
                                position={marker}
                                key={marker.lat}
                                icon = {{url: redDot}}
                            >
                            
                            {/* {infoWindow && (
                                <InfoWindow>
                                    <div onClick={handleDirections} className="infoBox">
                                        Get directions
                                    </div>
                                </InfoWindow>
                            )} */}
                            </Marker>
                        ))}
                    </GoogleMap>
                </div>
            ) : (
            <>
                <div>
                    <p className="loading-message">
                        Waiting for user location...
                    </p>

                    <div className="spinner">
                        <img src={spinner} height='20px' width='20px'/>
                    </div>
                </div>
            </>
            )}
        </Container>
      )
}
export default Home;