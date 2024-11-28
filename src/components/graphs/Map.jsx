import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

// reference code: https://jsfiddle.net/gh/get/library/pure/googlemaps/js-samples/tree/master/dist/samples/geocoding-simple/jsfiddle
const PoiMarkers = ({ pois }) => {
  return (
    <>
      {pois.map((poi, index) => (
        <AdvancedMarker key={index} position={poi.location} />
      ))}
    </>
  );
};

PoiMarkers.propTypes = {
  pois: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

const MapComponent = ({ locations }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: -33.8688, lng: 151.2093 },
        zoom: 13,
      });

      setMap(googleMap);

      // to be fixed...
      googleMap.addListener("click", (event) => {
        placeMarker(event.latLng);
        console.log(
          "Clicked location:",
          event.latLng.lat(),
          event.latLng.lng()
        );
      });
    }
  }, [map]);

  // user click on the map
  const placeMarker = (location) => {
    if (marker) {
      marker.setPosition(location);
    } else {
      const newMarker = new google.maps.AdvancedMarker({
        position: location,
        map: map,
      });
      setMarker(newMarker);
    }
  };

  return (
    <div>
      <div
        id="map"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      ></div>
      <PoiMarkers pois={locations} />
    </div>
  );
};

MapComponent.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default MapComponent;
