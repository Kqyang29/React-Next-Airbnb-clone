import React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function MapBox({ searchResults }) {

  const [selectedLoc, setSelectedLoc] = useState({});
  // transform the results object into the {lat:xx, log:xx} object
  const coordinates = searchResults.map(res => ({
    latitude: res.lat,
    longitude: res.long,
  }));

  //get the center lat and long of all json objects
  const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({

    longitude: center.longitude,
    latitude: center.longitude,
    zoom: 14
  });



  return (

    <ReactMapGL
      mapStyle="mapbox://styles/terrance8243/clbyk0do8000m14mpsbfyd12q"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}

    >

      {searchResults.map(res => (
        <div key={res.long} >
          <Marker
            longitude={res.long}
            latitude={res.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLoc(res)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >
              📌
            </p>
          </Marker>

          {selectedLoc.long === res.long && (
            <Popup
              onClose={() => setSelectedLoc({})}
              closeOnClick={true}
              latitude={res.lat}
              longitude={res.long}
            >
              {res.title}
            </Popup>
          )}

        </div>
      ))}

    </ReactMapGL>




  )
}

export default MapBox;