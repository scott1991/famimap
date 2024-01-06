import express from 'express';
let router = express.Router();

import { Store } from '../models/Store.js'

/* GET home page. */
router.get('/getinrange', function (req, res, next) {
  if (!req.query.lat || !req.query.lng || !req.query.radius) { //400
    res.status(400).json({ error: 'lat, lng and radius are required' });
    return;
  }

  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius);

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    res.status(400).json({ error: 'Invalid lat or lng' });
    return;
  }
  
  let query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: radius // meters
      }
    },
    disabled:false
  };

  if (req.query.specials) {
    query['specials'] = { $all: req.query.specials.split(',') };
  }

  Store.find(query)
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      
      console.error(err);
      res.status(500).send('Internal Server Error');
    });

});
export default router;
