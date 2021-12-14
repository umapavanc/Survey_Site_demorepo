/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - Define the route path of an application
*/

module.exports = app =>{
    const questions = require("../controllers/question.controller")

    var router = require("express").Router();

    //route for creating new question
    router.post("/api/questions/", questions.create);

    //route for getting all questions
    router.get("/api/questions/", questions.findAll);

    //route to retrieve all questions from specifc survey
    router.get("/api/questions/takeSurvey/:surveyId", questions.find);

    //route to get question by id
    router.get("/api/questions/:id", questions.findOne);

    //route to delete question with specified id
    router.delete("/api/questions/:id", questions.delete);

    //route to update question by id
    router.put("/api/questions/:id", questions.update);

    app.use(router);
}