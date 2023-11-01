import express from 'express';
let router = express.Router();

import {AllSpecial} from '../models/AllSpecial.js'
import {Store} from '../models/Store.js'

/* GET home page. */
router.get('/updatespecial', function (req, res, next) {
    AllSpecial.updateFromSrc()
    .then(() => {
        res.json( { title: 'updatespecial' });
    })
    
});

router.get('/updatestore', function (req, res, next) {
    Store.updateAllFromSrc()
    .then(() => {
        res.json( { title: 'updatestore' });
    })
    
});

export default router;
