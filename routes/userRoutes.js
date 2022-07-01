const { getLikeMovies, addTolikeMovies, removeFromLikeMovies } = require("../controllers/userController");

const router = require("express").Router();

router.get("/liked/:email", getLikeMovies);
router.post("/add", addTolikeMovies);
router.put("/remove", removeFromLikeMovies);



module.exports = router;