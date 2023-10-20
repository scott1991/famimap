import { Marker, Popup } from 'react-leaflet';

const StoreMarkers = ({ markers }) => {

  return (
<>
  {markers.map((marker, index) => (
    <Marker position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }} key={marker.SERID}>
      <Popup autoPan={false}>
        <div>
          <strong>{marker.name}</strong><br />
          服務號: {marker.SERID}  <a href={"tel:"+marker.tel}>{marker.tel}</a> <br />
          {marker.addr}<br />
          特殊服務: {marker.specials.join(', ')}
        </div>
      </Popup>
    </Marker>
  ))}
</>

  );
};

export default StoreMarkers;
