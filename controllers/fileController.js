const mongoose = require("mongoose");
const file = require("../models/file");
const content = require("../models/content");

exports.getFiles = async (req, res) => {
  try {
    const page = req.query.page || 1; // page
    const resPerPage = 20; // results per page

    const files = await file
      .find({})
      .populate("content")
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);
    res.json(files);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;

    // finding document
    const document = await file.findById(fileId).populate("content");

    // document not found
    if (!document) return res.sendNotFound();

    res.json(document);
  } catch (err) {
    console.log(err);
    res.sendServerError();
  }
};

exports.addFile = async (req, res) => {
  // starting mongoose session
  let session = null;
  try {
    // session
    session = await mongoose.startSession();
    session.startTransaction();

    // req data
    const fileName = req.body.name;
    const fileContent = req.body.content || "";

    // check if file exists
    const isFileExists = await file
      .findOne({ name: fileName })
      .session(session);
    if (isFileExists) {
      return res.sendAlreadyExists({ message: "file already exists" });
    }

    // creating file content
    const newContent = new content({ content: fileContent });
    const savedContent = await newContent.save({ session });

    // creating file metadata
    const newFile = new file({ name: fileName, content: savedContent._id });
    const savedFile = await newFile.save({ session });

    // transaction successfull so commit changes
    await session.commitTransaction();

    res.sendCreated(savedFile);
  } catch (err) {
    console.log(err);

    // transaction failed so revert changes
    if (session) await session.abortTransaction();

    res.sendServerError();
  } finally {
    session.endSession();
  }
};

exports.updateFileById = async (req, res) => {
  // starting mongoose session
  let session = null;
  try {
    const fileId = req.params.id;
    const fileName = req.body.name;
    const fileContent = req.body.content || "";

    // session
    session = await mongoose.startSession();
    session.startTransaction();

    // finding file and content
    const isFile = await file.findOne({ _id: fileId }).session(session);
    if (!isFile) return res.sendNotFound();
    const contentId = isFile.content;

    // updating file
    const updatedFile = await file
      .findOneAndUpdate(
        { _id: fileId },
        { $set: { name: fileName } },
        { new: true }
      )
      .session(session);

    // updating content
    const updatedContent = await content
      .findOneAndUpdate(
        { _id: contentId },
        { $set: { content: fileContent } },
        { new: true }
      )
      .session(session);

    // transaction successfull so commit changes
    await session.commitTransaction();

    updatedFile.content = updatedContent;

    res.json(updatedFile);
  } catch (err) {
    console.log(err);
    // transaction failed so revert changes
    if (session) await session.abortTransaction();

    res.sendServerError();
  } finally {
    session.endSession();
  }
};
