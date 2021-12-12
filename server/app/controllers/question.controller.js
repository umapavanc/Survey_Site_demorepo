/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - server.controller.js file send request and catch the response from DB
*/

const db = require('../models')
const Question = db.questions

//create an save new question
exports.create = (req, res) => {
    //validate
    if(!req.body.questionText) {
        res.status(400).send({message: "Question must have a body!"});
        return;
    }

    // create question
    const question = new Question({
        questionText: req.body.questionText,
        questionType: req.body.questionType,
        surveyId: req.body.surveyId
    });

    // save question in db
    question.save(question)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An Error occured while creating the question."
            });
        })
};

// Retrieve all questions from the database.
exports.findAll = (req, res) => {
    const questionText = req.query.questionText;
    var condition = questionText ? { questionText: { $regex: new RegExp(questionText), $options: "i" } } : {};
  
    Question.find(condition)
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
    // Retrieve all questions from from specific survey, based on surveyID.
    exports.find = (req, res) => {
    const surveyId = req.params.surveyId;
     
    Question.find({'surveyId': surveyId})
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

// Find a single question by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Question.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Question with with id " + id + " not found."});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Question with id " + id });
      });
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Question.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Question with id=${id}.`
          });
        } else {
          res.send({
            message: "Question was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Question with id=" + id
        });
      });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Question with id=${id}.`
            });
          } else res.send({ message: "Question was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Question with id=" + id
          });
        });
};
