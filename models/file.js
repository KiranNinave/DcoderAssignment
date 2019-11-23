const mongoose = require("mongoose");

const fileShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("file", fileShema);
