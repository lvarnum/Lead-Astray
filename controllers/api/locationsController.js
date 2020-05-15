const db = require("../../models");
const router = require("express").Router();

router.get("/", function(req, res) {
  db.Post.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
