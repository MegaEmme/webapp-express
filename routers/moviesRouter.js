const express = require('express');
//creo router con express
const router = express.Router();

const movieController = require('../controllers/movieController');
//index
router.get('/', movieController.index)
//show
router.get('/:id', movieController.show);
//store review
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;