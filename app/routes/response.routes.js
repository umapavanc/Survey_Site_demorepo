/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - Define the route path of an application
*/

module.exports = app =>{
    const responses = require("../controllers/response.controller")

    var router = require("express").Router();

    //route for creating new response
    router.post("/", responses.create);

     //route for getting all response
    router.get("/", responses.findAll);

    //route to retrieve all response from specifc survey
    router.get("/:questionId", responses.find);

    //route to get response by id
    router.get("/res/:id", responses.findOne);

    //route to delete response with specified id
    router.delete("/:id", responses.delete);

    //route to update response by id
    router.put("/:id", responses.update);

    app.use('/api/responses', router);
}