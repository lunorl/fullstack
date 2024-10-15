const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genres: [{ type: String }],
});

// Add a virtual field 'id' that maps to '_id'
schema.virtual("id").get(function () {
  return this._id.toString();
});

// Add the unique validator plugin

module.exports = mongoose.model("Book", schema);
