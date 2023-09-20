import express from 'express';
let router = express.Router();

import {AllSpecial} from '../models/AllSpecial.js'

/* GET home page. */
router.get('/', function (req, res, next) {
  AllSpecial.find()
    .then(specials => { 
    // only need name,category,displayName
      let specials2 = specials.map(s => {
        return {
          name: s.name,
          category: s.category,
          displayName: s.displayName
        }
      });
      res.json(specials2);
    });
    
});


export default router;
