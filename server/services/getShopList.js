import fetch from 'node-fetch';

export function getShopList(city){
  const baseUrl = 'https://api.map.com.tw';
  const path = '/net/familyShop.aspx';
  const queryParams = new URLSearchParams({
    searchType: 'ShopList',
    type: '',
    city: city,
    area: '',
    road: '',
    fun: 'showStoreList',
    key: '6F30E8BF706D653965BDE302661D1241F8BE9EBC'
  });
  const referer = 'https://www.family.com.tw';
  
  const url = new URL(path, baseUrl);
  url.search = queryParams.toString();
  
  fetch(url.toString(), {
    headers: {
      Referer: referer
    }
  })
    .then(response => response.text())
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
}