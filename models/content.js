const mongoose = require("mongoose");

const fileContentSchema = new mongoose.Schema(
  {
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("content", fileContentSchema);
