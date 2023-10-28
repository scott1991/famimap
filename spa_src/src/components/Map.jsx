import React from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, ScaleControl, Circle } from 'react-leaflet';
import StoreMarkers from './StoreMarkers.jsx';


import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const MapContent = ({ handleMapCenter, markers, mapCenter }) => {
  const updateCenter = () => {
    // console.log("moveend");
    const updatedCenter = map.getCenter();
    // console.log("Updated center:", updatedCenter);

    const size = map.getSize();
    const latLngStart = map.containerPointToLatLng([0, 0]);
    const latLngEnd = map.containerPointToLatLng([size.x, size.y]);
    const radius = Math.min(latLngStart.distanceTo(latLngEnd) / 2, 6000);
    handleMapCenter(updatedCenter.lat, updatedCenter.lng, radius);
  }

  const map = useMapEvents({
    moveend: () => {
      updateCenter();
    },
    locationfound: (location) => {
      const { lat, lng } = location.latlng;
      map.flyTo([lat, lng], 15);
    },
    locationerror: (error) => {
      console.log(error);
    }

  })

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    <><TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="Map data &copy; OpenStreetMap contributors" />
      <ScaleControl position="bottomleft" metric={true} imperial={false} />
      <StoreMarkers markers={markers} />
      <Circle center={[mapCenter.lat, mapCenter.lng]} radius={mapCenter.radius} color="blue" fillOpacity={0} weight={2} />
    </>

  );
};

const Map = ({ handleMapCenter, markers, mapCenter }) => {
  return (
    <MapContainer center = {[25.0510035, 121.5422824]} zoom = {14} style = {{ height: '100%', width: '100%' }} >
      <MapContent handleMapCenter={handleMapCenter} markers={markers} mapCenter={mapCenter}/>
    </MapContainer >
  )
}

export default Map;