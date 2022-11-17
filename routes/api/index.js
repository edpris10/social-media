const router = require('express').Router();
const commentRoutes = require('./user-routes');
const pizzaRoutes = require('./thoughts-routes');

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);

module.exports = router;
