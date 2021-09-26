import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  selectedFile: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  message: String,
  creator: String,
  name: String,
  tags: [String],

  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  details: {
    type: String,
    require: true,
  },
});

const postMessage = mongoose.model("PostMessage", postSchema);

export default postMessage;
