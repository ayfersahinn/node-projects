const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: String,
    message: String,
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
