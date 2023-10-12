import React from 'react';
import { MapContainer, TileLayer, useMapEvents, ScaleControl } from 'react-leaflet';
import StoreMarkers from './StoreMarkers.jsx'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapEventsHandler = ({ getStoresInRange, handleMapCenter }) => {
  const handleEvent = () => {
    const center = map.getCenter();
    const size = map.getSize();
    const latLngStart = map.containerPointToLatLng([0, 0]);
    const latLngEnd = map.containerPointToLatLng([size.x, size.y]);
    const radius = Math.min(latLngStart.distanceTo(latLngEnd) / 2, 6000);
    handleMapCenter(center.lat, center.lng, radius);
    getStoresInRange();
    console.log('dragend/zoomend');
  };

  const map = useMapEvents({
    dragend: handleEvent,
    zoomend: handleEvent
  });

  return null; // 只處理事件，不需要返回 JSX。
};

const Map = ({ getStoresInRange, handleMapCenter, markers }) => {

  return (
    <MapContainer center={[25.13327, 121.49717]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <ScaleControl position="bottomleft" metric={true} imperial={false} />
      <MapEventsHandler getStoresInRange={getStoresInRange} handleMapCenter={handleMapCenter} />
      <StoreMarkers markers={markers} />
    </MapContainer>
  );
};
export default Map;