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
              {marker.name} {/* 你可以在這裡添加更多 marker 的屬性，如地址等 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
