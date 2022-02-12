const express = require('express');
const router = express.Router();
const film = require('../controllers/film.controller');

router.get('/films', film.getAll);
router.get('/', (req, res) =>{
    console.log("HOME ROUTE");
});
module.exports = router;