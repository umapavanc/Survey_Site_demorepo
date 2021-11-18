module.exports = mongoose => {
    const Survey = mongoose.model(
      "surveys",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
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