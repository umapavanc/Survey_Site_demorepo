/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - define schema of survey object
*/
module.exports = mongoose => {
    const Survey = mongoose.model(
      "surveys",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean,
          user: String
        },
        { timestamps: true }
      )
    );

    mongoose.set('toJSON', {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      }
    });
  
    return Survey;
  };