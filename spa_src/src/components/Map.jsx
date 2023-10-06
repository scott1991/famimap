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

const MapEventsHandler = ({ getStoresInRange, handleMapCenter }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      handleMapCenter(center.lat, center.lng, zoom);
      getStoresInRange();
    },
    zoomend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      handleMapCenter(center.lat, center.lng, zoom);
      getStoresInRange();
    }
  });

  return null; // just for handle event, no need to return JSX。
};

const Map = ({ getStoresInRange, handleMapCenter }) => {
  // const markers = [];
  const markers = [
    {
      name: '全家大同店',
      location: [25.132132, 121.497258],
    },
    {
      name: '全家光明店',
      location: [25.132661, 121.49916],
    },
  ];
  return (
    <MapContainer center={[25.13327, 121.49717]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      
      <MapEventsHandler getStoresInRange={getStoresInRange} handleMapCenter={handleMapCenter}/>
      <StoreMarkers markers={markers} />
    </MapContainer>
  );
};
export default Map;