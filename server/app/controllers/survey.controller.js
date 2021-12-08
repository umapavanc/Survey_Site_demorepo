/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - server.controller.js file send request and catch the response from DB
*/
const db = require('../models')
const Survey = db.surveys


// create and save new survey
exports.create = (req, res) => {
    //validate
    if (!req.body.title) {
        res.status(400).send({ message: "content cannot be empty" });
        return;
    }


    // create survey
    const survey = new Survey({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //save survey in db
    survey
        .save(survey)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured when creating the Survey."
            });
        })
};

// Retrieve all surveys from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Survey.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving surveys."
        });
      });
};

// Find all published surveys
exports.findAllPublished = (req, res) => {
    Survey.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveys."
      });
    });
};

// Find a single survey by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Survey.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Survey with with id " + id + " not found."});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Survey with id=" + id });
      });
};
   
// Update a Survey by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Survey.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Survey with id=${id}.`
            });
          } else res.send({ message: "Survey was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Survey with id=" + id
          });
        });
};

// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Survey.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Survey with id=${id}.`
          });
        } else {
          res.send({
            message: "Survey was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Survey with id=" + id
        });
      });
};
