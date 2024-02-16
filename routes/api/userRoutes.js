const router = require('express').Router();
const {getUsers, getSingleUser, createUser, addFriend, removeFriend, deleteUser, updatedUser} = require('../../controllers/userController');
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updatedUser);;
router.route('/:userId/friend/:friendId').put(addFriend).delete(removeFriend)


module.exports = router;