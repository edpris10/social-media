const router = require('express').Router();
const {
  getAllthought,
  getthoughtById,
  createthought,
  updatethought,
  deletethought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllthought)
  .post(createthought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getthoughtById)
  .put(updatethought)
  .delete(deletethought);

module.exports = router;
