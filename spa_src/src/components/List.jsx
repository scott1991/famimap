import React from 'react';

function List({ markers }) {
  return (
    <div className="store-list" style={{ height: '100%'}}>
      {markers.length === 0 ? (
        <p></p>
      ) : (
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>
              {marker.name} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
