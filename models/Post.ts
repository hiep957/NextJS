import mongoose from "mongoose";
export interface Post {
  title: string;
  content: string;
  author: {
    name: string;
    // avatar: string;
  };
  thumbnail: string;
  date: string;
  tag: string[];
}
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provi  de a title"],
  },
  content: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  author: {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  thumbnail: {
    type: String,
  },

  date: {
    type: String,
  },
  tag: {
    type: [String],
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
