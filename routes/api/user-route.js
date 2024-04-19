const router = require('express').Router();
const { getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')


//Get all users route and post a new user
router.route('/').get(getUsers).post(createUser);

//get a single user by _id and populated thought and friend data
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//Add a friend to user
router.route('/:userId/friends').post(addFriend);

//Delete a users friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;