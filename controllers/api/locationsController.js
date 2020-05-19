const db = require("../../models");
const router = require("express").Router();

/**
 * Location - Read All
 */
router.get("/", function(req, res) {
  db.Location.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Location - Read One
 */
router.get("/:id", function(req, res) {
  db.Location.findOne({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Location - Create
 */
router.post("/", function(req, res) {
  db.Location.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
