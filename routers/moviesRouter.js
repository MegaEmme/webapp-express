const express = require('express');
//creo router con express
const router = express.Router();

const upload = require('../middlewares/multer');

const movieController = require('../controllers/movieController');
//index
router.get('/', movieController.index)
//show
router.get('/:slug', movieController.show);
//store
router.post('/', upload.single('image'), movieController.store);
//store review
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;

