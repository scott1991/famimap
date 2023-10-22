import { Marker, Popup } from 'react-leaflet';
import StoreDetail from './StoreDetail.jsx';
const StoreMarkers = ({ markers }) => {

  return (
<>
  {markers.map((marker) => (
    <Marker position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }} key={marker.SERID}>
      <Popup autoPan={false}>
        <StoreDetail storeDetail={marker} />
      </Popup>
    </Marker>
  ))}
</>

  );
};

export default StoreMarkers;
