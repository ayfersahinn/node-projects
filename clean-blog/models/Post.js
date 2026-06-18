const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: String,
  message: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
postSchema.virtual("formattedDate").get(function () {
  return new Date(this.createdDate).toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
