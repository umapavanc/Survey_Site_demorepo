/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - Define the route path of an application
*/
module.exports = app => {
    const surveys = require("../controllers/survey.controller.js");

    var router = require("express").Router();

    //route for creating new survey
    router.post("/", surveys.create);

    //route to retrieve all surveys
    router.get("/", surveys.findAll);

    //route to retrieve all published surveys
    router.get("/published", surveys.findAllPublished);

    //route to get survey by id
    router.get("/:id", surveys.findOne);

    //route to update survey by id
    router.put("/:id", surveys.update);

    //route to delete survey with specified id
    router.delete("/:id", surveys.delete);

    app.use('/api/surveys', router);
}