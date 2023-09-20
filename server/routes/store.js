import express from 'express';
let router = express.Router();

import { Store } from '../models/Store.js'

/* GET home page. */
router.get('/getinrange', function (req, res, next) {
  if (!req.query.lat || !req.query.lng || !req.query.radius) { //400
    res.status(400).json({ error: 'lat, lng and radius are required' })
  }

  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius);


  
  let query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: radius // meters
      }
    }
  };

  if (req.query.specials) {
    query['specials'] = { $in: req.query.specials.split(',') };
  }

  Store.find(query)
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      
      console.error(err);
      res.status(500);
    });

});
export default router;
