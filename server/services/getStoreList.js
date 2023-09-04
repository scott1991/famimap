import fetch from 'node-fetch';

export function getShopList(city) {
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

  return fetch(url.toString(), {
    headers: {
      Referer: referer
    }
  })
    .then(response => response.text())
    .then(data => {
      // data == showStoreList([{}]
      const dataStr = data.replace('showStoreList(', '').replace(')', '');
      return JSON.parse(dataStr);
    })
}

/*
  [
    {
    "NAME": "全家宜蘭東澳店",
    "TEL": "03-9986229",
    "POSTel": "03-9108087",
    "px": 121.832826,
    "py": 24.520344,
    "addr": "宜蘭縣南澳鄉東岳村蘇花路三段２０１號一樓",
    "SERID": 52018.0,
    "pkey": "016616",
    "oldpkey": "012018",
    "post": "272",
    "all": "SWEETPOTATO,Toilet,Rest,veg,CS,steam",
    "road": "蘇花路三段",
    "twoice": null
    }, // more...
  ]
*/ 