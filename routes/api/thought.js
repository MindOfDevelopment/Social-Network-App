const router = require("express").Router();
const {
  createThought,
  deleteThoughtById,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtCtrl");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
