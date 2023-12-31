const express = require('express');
const router = express.Router();
const { Recipes } = require('../models');
const { recipesController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');
const { upload } = require('../config/conn');

// get method - get the list of recipes
router
  .route('/')
  .get(recipesController.list)
  .post(upload.single('image'), recipesController.create)
  .delete(recipesController.destroy);

// post method - create multiple recipes
router
  .route('/bulk')
  .post(checkBulkUniquenessMiddleware(Recipes), recipesController.bulkRecipes);

// get method - get the paginated list of recipes
router.route('/list').get(recipesController.paginatedList);

// get method - get the paginated list of recipes based on meal types
router.route('/list/types').get(recipesController.paginatedListMealTypes);

router.route('/recipe/:id').put(recipesController.update);
// get method - get single recipe
router
  .route('/:id')
  .get(recipesController.show)
  .put(upload.single('image'), recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

// get method - get personal recipes
router.route('/personal/:id').get(recipesController.personalRecipes);
router.route('/filter').post(recipesController.filteredRecipes);

module.exports = router;
