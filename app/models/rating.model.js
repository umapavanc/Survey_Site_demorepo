const mongoose = require("mongoose");

const Rating = mongoose.model(
  "Rating",
  new mongoose.Schema({
    rating: ["one star", "two stars", "three stars", "four stars", "five stars", "n/a"]
  })
);

module.exports = Rating;