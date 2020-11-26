const db = require("../models");
const Vote = db.votes;

// Create and Save a new Tutorial
exports.create =async (req, res) => {
  // Validate request
  if (!req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Vote({
    category: req.body.category,
    artist: req.body.artist,
    user: req.body.user,
    // published: req.body.published ? req.body.published : false
  });
  let f = false;
  var condition = tutorial.category && tutorial.user ?  {"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}, "category": tutorial.category, "user": tutorial.user}  : {};
  const object = await retrieVoted (condition);
  f = object.length > 0 ? true : false;
  // Save Tutorial in the database
  if(f) {
    res.status(400).send({
        message:
           "User has already voted."
      });
  }else {
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  }
  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Vote.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


function retrieVoted(condition) {
  return Vote.find(condition).exec();
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vote.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
exports.findByCategory = (req, res) => {
  const category = req.params.category;
  if (!req.params.category) {
    res.status(400).send({ message: "Category can not be empty!" });
    return;
  }
  var condition =  { category: category } ;

  Vote.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Vote.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // Vote.findByIdAndRemove(id, { useFindAndModify: false })
  //   .then(data => {
  //     if (!data) {
  //       res.status(404).send({
  //         message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
  //       });
  //     } else {
  //       res.send({
  //         message: "Tutorial was deleted successfully!"
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Could not delete Tutorial with id=" + id
  //     });
  //   });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  // Vote.deleteMany({})
  //   .then(data => {
  //     res.send({
  //       message: `${data.deletedCount} Tutorials were deleted successfully!`
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while removing all tutorials."
  //     });
  //   });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Vote.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
