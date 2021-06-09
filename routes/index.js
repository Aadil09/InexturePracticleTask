const express = require("express");
const router = express.Router();
const bookData = require("../controllers/book/view");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits:
  {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

 router.post("/book", upload.single('book_image'), bookData.createBookDetails);
 router.get("/book-list", bookData.listAllBookDetails);
 router.get("/book-list/:id",bookData.bookDetail)
 router.put("/edit/:id", upload.single('book_image'), bookData.editBookDetails);
 router.delete("/delete/:id", bookData.deleteBookDetails)

module.exports = router;
