let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
        _id: Number,
        categoryId: Number,
        description: String,
        isActive: Boolean,
        userId: Number
},
{
    collection: "header"
});

module.export = mongoose.model("Survey", surveyModel);