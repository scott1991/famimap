import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import StoreMarkers from './StoreMarkers.jsx'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
console.log(L.Icon.Default.prototype._getIconUrl("iconRetinaUrl"));
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ getStoresInRange, handleMapCenter }) => {
  const markers = [];

  return (
    <MapContainer center={[25.13327, 121.49717]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />

      <StoreMarkers markers={markers} getStoresInRange={getStoresInRange} handleMapCenter={handleMapCenter}/>
    </MapContainer>
  );
};
export default Map;