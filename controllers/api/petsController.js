const db = require("../../models");
const router = require("express").Router();

/**
 * Pet - Read All
 */
router.get("/", function(req, res) {
  db.Pet.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Pet - Read One
 */
router.get("/:id", function(req, res) {
  db.Pet.findOne({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Pet - Create
 */
router.post("/", function(req, res) {
  db.Pet.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Pet - Update
 */
router.put("/:id", function(req, res) {
  db.Pet.update(req.body, { where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Pet - Delete
 */
router.delete("/:id", function(req, res) {
  db.Pet.destroy({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
