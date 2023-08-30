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
  specials: [String], 
  road: String
});

const Store = mongoose.model('Store', storeSchema);
