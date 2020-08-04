const express = require("express");
const router = express.Router();
const Data = require("../data/db");

//returns an array of all the post objects contained in the database
router.get("/", (req, res) => {
  Data.find()
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

//returns the post object with the specified id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ data: post });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

//returns an array of all comment objects associated with the post and specified id
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Data.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        Data.findPostComments(id)
          .then((comment) => {
            if (comment[0] === undefined) {
              res
                .status(200)
                .json({ message: "This post has no comments yet" });
            } else {
              res.status(200).json({ data: comment });
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: "The comments information could not be retrieved",
            });
          });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The post with the specified ID does not exist." })
    );
});

//creates a post using the information sent inside the request body
router.post("/", (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Data.insert(post)
      .then((postMade) => {
        Data.findById(postMade.id)
          .then((post) => {
            res.status(201).json(post);
          })
          .catch((err) => {
            res
              .status(404)
              .json({ error: "A post with that ID can't be found" });
          });
      })
      .catch((err) => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

module.exports = router;
