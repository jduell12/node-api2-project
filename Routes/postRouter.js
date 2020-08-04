const express = require("express");
const router = express.Router();
const Data = require("../data/db");

router.get("/", (req, res) => {
  Data.find()
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
