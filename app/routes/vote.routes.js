module.exports = app => {
  const votes = require("../controllers/vote.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", votes.create);

  // Retrieve all Tutorials
  router.get("/", votes.findAll);

  // Retrieve all published Tutorials
  router.get("/published", votes.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", votes.findOne);
  
  router.get("/category/:category", votes.findByCategory);

  // Update a Tutorial with id
  router.put("/:id", votes.update);

  // Delete a Tutorial with id
  router.delete("/:id", votes.delete);

  // Create a new Tutorial
  router.delete("/", votes.deleteAll);

  app.use("/api/votes", router);
};
