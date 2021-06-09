const mongoose = require("mongoose");

const bookMasterSchema = mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: String,
      required: true,
    },
    bookDescription: {
      type: String
    },
    bookAuthor: {
      type: String
    },
    bookCategory: {
      type: String
    },
    book_image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Book_Master
 */

const Book_Master = mongoose.model("book_Master", bookMasterSchema);
module.exports = Book_Master;
