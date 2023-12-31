const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { usersController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// get method - get all users
// post method - create new user
router
  .route('/')
  .get(usersController.list)
  .post(checkSingleUniquenessMiddleware(Users, 'email'), usersController.create)
  .delete(usersController.destroy);

// post method - create multiple user
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Users, 'email'),
    usersController.bulkUsers
  );

// post method - remove and add favorites
router.route('/manage').post(usersController.managaFavorite);

// post method - follow and unfollow user
router.route('/follow').post(usersController.followUser);

// get method - get the paginated list of users
router.route('/list').get(usersController.paginatedList);

// post method - log the user
router.route('/auth/login').post(usersController.login);

// post method - validate password
router.route('/auth/password').post(usersController.password);

// post method - forgot password
router.route('/auth/forgot').post(usersController.forgotPassword);

// get method - get filters data
// patch method - update filtered field
router
  .route('/auth/filters')
  .get(usersController.filters)
  .patch(usersController.modify);

// post method - validate username and email
router.route('/validate/:id').post(usersController.validate);

// get method - get single user
router.route('/:id').get(usersController.show).put(usersController.update);

module.exports = router;
