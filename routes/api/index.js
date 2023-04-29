const router = require("express").Router();
const userRoutes = require("./user-routes");
const journalRoutes = require("./journal-routes");

// restful api endpoints
router.use("/users", userRoutes);
router.use("/journals", journalRoutes);

module.exports = router;
