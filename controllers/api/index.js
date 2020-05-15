const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const petRoutes = require("./petsController");
const locationRoutes = require("./locationsController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/locations", locationRoutes);

// Export the router
module.exports = router;
