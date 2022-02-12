const express = require('express');
const router = express.Router();
const film = require('../controllers/film.controller');

router.get('/films', film.getAll);

module.exports = router;