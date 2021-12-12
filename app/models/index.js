/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
*/
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.surveys = require("./survey.model.js")(mongoose);
db.questions = require("./question.model")(mongoose);
db.responses = require("./response.model")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;