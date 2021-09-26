import mongoose from "mongoose";
import postMessage from "../models/PostMessage.js";

export const getPost = async (req, res) => {
  try {
    const PAGE_SIZE = 8;
    const page = parseInt(req.query.page || "1");
    const total = await postMessage.countDocuments({});
    const startIndex = (page - 1) * PAGE_SIZE;
    const postMessages = await postMessage
      .find()
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)

      .skip(startIndex);

    res.status(200).json({
      data: postMessages,
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage: page,
    });
  } catch (err) {
    res.status(404).send({ message: "Can't get the Blogs" });
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const titlePost = new RegExp(searchQuery, "i");

    const post = await postMessage.find({
      $or: [{ title: titlePost }, { tags: { $all: [titlePost] } }],
    });

    res.json({ data: post });
  } catch (err) {
    res.status(404).send({ message: "No Blog Found" });
  }
};

export const CreatePost = async (req, res) => {
  const newPost = new postMessage({
    selectedFile: req.body.selectedFile,
    title: req.body.title,
    message: req.body.message,
    creator: req.userId,
    tags: req.body.tags,
    likeCount: req.body.likeCount,
    createdAt: new Date().toISOString(),
    details: req.body.details,
    name: req.body.name,
  });

  try {
    const createdPost = await newPost.save();
    res.status(201).json(createdPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;

  try {
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(409).send({ message: "Can't Create the Post" });
  }
};

export const getDetails = async (req, res) => {
  const blogPost = await postMessage.findById(req.params.id);

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).send({ message: "Blog not Found" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      await postMessage.findByIdAndRemove(id);
    }
    res.send({ message: "Post Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const likedPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

export const GetMyPost = async (req, res) => {
  const blogPost = await postMessage.find({ creator: req.params.id });

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).send({ message: "Blog not Found" });
  }
};
