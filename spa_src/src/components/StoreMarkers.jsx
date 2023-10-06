import { Marker, Popup } from 'react-leaflet';

const StoreMarkers = ({ markers }) => {

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
