/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - server.controller.js file send request and catch the response from DB
*/

const db = require('../models')
const Response = db.responses

//create an save new response
exports.create = (req, res) => {
    //validate
    if(!req.body.responseText) {
        res.status(400).send({message: "Response must have a body!"});
        return;
    }

    // create respose
    const response = new Response({
        responseText: req.body.responseText,
        questionId: req.body.questionId
    });

    // save question in db
    response.save(response)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An Error occured while creating the response."
            });
        })
};

// Retrieve all responses from the database.
exports.findAll = (req, res) => {
    const responseText = req.query.responseText;
    var condition = responseText ? { responseText: { $regex: new RegExp(responseText), $options: "i" } } : {};
  
    Response.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving responses."
        });
      });
};

    // Retrieve all responses from from specific question, based on questionID.
    exports.find = (req, res) => {
    const questionId = req.params.questionId;
     
    Response.find({'questionId': questionId})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving questions."
        });
      });
};

// Find a single response by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Response.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Response with with id " + id + " not found."});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Response with id " + id });
      });
};

// Delete a Response with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Response.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Response with id=${id}.`
          });
        } else {
          res.send({
            message: "Response was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Response with id=" + id
        });
      });
};

// Update a Response by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Response.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Response with id=${id}.`
            });
          } else res.send({ message: "Response was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Response with id=" + id
          });
        });
};
