const router = require("express").Router();
const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
  addFriendById,
  deleteFriendById,
} = require("../../controllers/userCtrl");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router
  .route("/:userId/friends/:friendId")
  .post(addFriendById)
  .delete(deleteFriendById);

module.exports = router;
