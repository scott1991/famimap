import React from 'react';
import StoreDetail from './StoreDetail.jsx';

function List({ markers }) {
  return (
    <div className="store-list" style={{ height: '100%' }}>
      {markers.length === 0 ? (
        <p></p>
      ) : (
        markers.map((marker) => (
          <div className="card" key={marker.SERID}>
            <div className="card-header">
              {marker.name}
            </div>
            <div className="card-body" style={{ padding: '0.4rem' }}>
              <StoreDetail storeDetail={marker} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default List;
