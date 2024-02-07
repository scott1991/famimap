import { getShopList } from '../services/getStoreList.js';
import mongoose from 'mongoose';
import configs from '../config.json' assert { type: "json" };
const config = configs[process.env.NODE_ENV || 'development'];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const storeSchema = new mongoose.Schema({
  name: String,
  tel: String,
  postel: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  },
  addr: String,
  SERID: Number,
  pkey: String,
  post: String,
  specials: { type: [String], index: true },
  road: String,
  disabled: { type: Boolean, default: false, index: true  }
}, {
  timestamps: true
});

storeSchema.index({ 'location': '2dsphere' });
storeSchema.statics.updateFromSrc = async function (city) {
    const storeList = await getShopList(city);
  console.log(`got ${storeList.length} stores from ${city}`);
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
  const result = await Promise.all(stores.map(store => {
    return this.updateOne({ SERID: store.SERID }, store, { upsert: true });
  }));
  console.log(`updated ${result.length} stores from ${city}`);
}
storeSchema.statics.updateAllFromSrc = async function () {
  const cities = config.cities; 
  for (let city of cities) {
    await this.updateFromSrc(city);
    await delay(5000);
  }
}

storeSchema.statics.disableNoUpdatedStores = async function(){
  // disable stores which have not been updated more than one day
  let condition = { updatedAt: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24) } } ;
  const result = await this.updateMany( condition, { disabled: true });
  let condition2 = { updatedAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) } } ;
  const result2 = await this.updateMany( condition2, { disabled: false });
  return result;
}
export const Store = mongoose.model('Store', storeSchema);
