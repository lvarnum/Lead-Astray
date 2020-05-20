const db = require("../../models");
const router = require("express").Router();
const aws = require("aws-sdk");
aws.config.update = {
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

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

router.get("/sign-s3/:fileName/", (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.params.fileName;
  const fileType = "image/jpeg";
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
