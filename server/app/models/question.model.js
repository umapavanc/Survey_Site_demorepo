/*
Team Name - Quick Survey
Group no - 2 
Student Id's - 300566849, 301211038, 301153525, 301072907, 301159366
Purpose - define schema of survey object
*/
module.exports = mongoose => {
    const Question = mongoose.model(
        "questions",
        mongoose.Schema(
            {
                questionText: String,
                surveyId: String,
                ratings: [
                  {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Rating"
                  }
                ]
            }
          
        )
    );

    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
          delete converted._id;
        }
      });
    
      return Question;
    };
