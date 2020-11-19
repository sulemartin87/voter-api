module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      category: String,
      artist: String,
      user: String,
      // published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vote = mongoose.model("vote", schema);
  return Vote;
};
