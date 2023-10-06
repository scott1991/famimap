import { Marker, Popup, useMapEvents } from 'react-leaflet';

const StoreMarkers = ({ markers, getStoresInRange }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      getStoresInRange(center.lat, center.lng);
    }
  });

  return (
    <>
      {markers.map((marker, index) => (
        <Marker position={marker.location} key={index}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default StoreMarkers;
