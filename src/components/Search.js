/*global google*/
import React from "react";

import {StandaloneSearchBox} from "@react-google-maps/api";

let searchBox;
function Search({map, updateMarkers, markers}) {
    const onSBLoad = ref => {
        searchBox = ref;
    };

    const onPlacesChanged = () => {
        const results = searchBox.getPlaces();
        updateMarkers(results);
    };

    return (
        <div>
            <div id="searchbox">
                <StandaloneSearchBox
                onLoad={onSBLoad}
                onPlacesChanged={onPlacesChanged}
                bounds={new window.google.maps.LatLngBounds()}
                >
                <input
                    type="text"
                    placeholder="Search place or address"
                    style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                    }}
                />
                </StandaloneSearchBox>
            </div>
        </div>
    );
}
export default Search;