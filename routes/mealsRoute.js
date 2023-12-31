const express = require('express');
const router = express.Router();
const { MealTypes } = require('../models');
const { mealsController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  bulkMealsDataMiddleware,
} = require('../middlewares');
const { upload } = require('../config/conn');

// get method - get the list of meals
router
  .route('/')
  .get(mealsController.list)
  .post(upload.single('image'), mealsController.create)
  .delete(mealsController.destroy);
// post method - create multiple meal types
router.route('/bulk').post(bulkMealsDataMiddleware, mealsController.bulkMeals);

// get method - get the paginated list of meals
router.route('/list').get(mealsController.paginatedList);

router.route('/list/time').get(mealsController.listByTime);

// get method - get the list of meal types
router
  .route('/types')
  .get(mealsController.listMealTypes)
  .delete(mealsController.destroyMT);

// get method - get the list of meal types
router.route('/types/list').get(mealsController.paginatedMealTypes);

// post method - create multiple meal types
router
  .route('/types/bulk')
  .post(
    checkBulkUniquenessMiddleware(MealTypes),
    mealsController.bulkMealTypes
  );

router
  .route('/types/:id')
  .get(mealsController.showMT)
  .put(mealsController.updateMT);

// get method - get single meal
router
  .route('/:id')
  .get(mealsController.show)
  .put(upload.single('image'), mealsController.updateMeal)
  .delete(mealsController.deleteMeal);

router.route('/personal/:id').get(mealsController.personalMeals);

module.exports = router;
