import { getShopList } from '../services/getStoreList.js';
import mongoose from 'mongoose';
import configs from '../config.json' assert { type: "json" };
const config = configs[process.env.NODE_ENV || 'development'];


const storeSchema = new mongoose.Schema({
  name: String,
  tel: String,
  postel: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  addr: String,
  SERID: Number,
  pkey: String,
  post: String,
  specials: { type: [String], index: true },
  road: String
});

storeSchema.statics.updateStores = async function () {
  const cities = config.cities; // ["宜蘭縣","花蓮縣", ...]
  for (let city of cities) {
    const storeList = await getShopList(city);
    const stores = storeList.map(store => {
      return {
        name: store.NAME,
        tel: store.TEL,
        postel: store.POSTel,
        location: {
          type: 'Point',
          coordinates: [store.px, store.py]
        },
        addr: store.addr,
        SERID: store.SERID,
        pkey: store.pkey,
        post: store.post,
        specials: store.all ? store.all.split(',').map(item => item.toLowerCase()) : [],
        road: store.road
      };
    });
    await Promise.all(stores.map(store => {
      return this.updateOne({ SERID: store.SERID }, store, { upsert: true });
    }));
  }
}
export const Store = mongoose.model('Store', storeSchema);
