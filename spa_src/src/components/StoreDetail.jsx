import React from 'react';
const StoreDetail = ({ storeDetail }) => {
  return (
    <div>
      <strong>{storeDetail.name}</strong><br />
      服務號: {storeDetail.SERID}  <a href={"tel:" + storeDetail.tel}>{storeDetail.tel}</a> <br />
      {storeDetail.addr}<br />
      特殊服務: {storeDetail.specials.map(special => {
        let iconUrl;
        try {
          iconUrl = require(`../icons/${special}.png`);
        } catch (err) {
          iconUrl = null;
        }
        return (
          iconUrl && <img key={special} title={special} style={{ maxWidth: '30px', maxHeight: '30px', height: 'auto' }} src={iconUrl} alt={special} />
        )
      })}
    </div>
  )
}
export default StoreDetail;