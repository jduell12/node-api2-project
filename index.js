const express = require("express");
const PORT = 8000;
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Serving working");
});

//get routes
const postRouter = require("./Routes/postRouter");

server.use("/api/posts", postRouter);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
