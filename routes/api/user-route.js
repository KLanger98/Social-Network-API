const router = require('express').Router();
const { getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser

} = require('../../controllers/userController')


//Get all users route and post a new user
router.route('/').get(getUsers).post(createUser);

//get a single user by _id and populated thought and friend data
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//Post a new user
//
router.route('/:userId/friends/:friendId').post();

//Update a user by it's _id

//Delete a user by its _id

module.exports = router;