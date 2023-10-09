import { Marker, Popup } from 'react-leaflet';

const StoreMarkers = ({ markers }) => {

  return (
    <>
      {markers.map((marker,index) => (
        <Marker position={{lat:marker.location.coordinates[1], lng: marker.location.coordinates[0]}} key={marker.SERID}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default StoreMarkers;
