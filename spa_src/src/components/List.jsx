import React from 'react';

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
            <div className="card-body" style={{padding:'0.4rem'}}>
              <span className="card-text">服務號:{marker.SERID}</span><br />
              <span className="card-text">{marker.addr}</span><br />
              <span className="card-text">Tel: {marker.tel}</span><br />
              <span className="card-text">Specials: {marker.specials.join(', ')}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default List;
