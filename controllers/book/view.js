// ==================== Load Starts Modules =========================================
const httpStatus = require("http-status");
const { bookMaster } = require("../../models");
const MESSAGE = require("../../config/message");

// ==================== Load Modules Ends =========================================


/**
 * Create a BookDetails
 * @param {Object} body
 * @returns {Promise<bookMaster>}
 */

const createBookDetails = async (req, res) => {
  const data = req.body; 
  const  bookName  = req.body.bookName.trim();
  req.body.bookName = bookName;
  let query = { bookName };

  await bookMaster.findOne(query)
    .then(async (bookData) => {
      if (!bookData) {
        data.book_image = req.file.path;
        const book = await bookMaster.create(data);
       
        return res.json({
          code: 200,
          status: true,
          message: MESSAGE.createSuccess,
          data: book
        })
      } else {
        return res.json({
          code: 409,
          status: false,
          message: MESSAGE.alreadyExist,
          data: {}
        })
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        code: 404,
        status: false,
        data: {}
      })
    });
};

/**
 * ListAll BookDetails
 * @returns {Promise<bookMaster>}
 */

const listAllBookDetails = async (req, res) => {
  const skip= req.body.skip|0;
  const take= req.body.take|10;

  return await bookMaster.find().skip(skip).limit(take)
    .then(async (data) => {
      return await res.status(httpStatus.OK).send({ data });
    })
    .catch((error) => {
      return error;
    });
};

/**
 * ListIdBased BookDetails
 * @param {ObjectId} id
 * @returns {Promise<bookMaster>}
 */

const bookDetail = async (req, res) => {

  let query = {
    _id: req.params.id,
  };
  return await bookMaster.findById(query)
    .then(async (data) => {
      return await res.status(httpStatus.OK).send({ data });
    })
    .catch((error) => {
      return error;
    });
};

/**
 * Update BookDetails by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {{Promise<bookMaster>}
 */

const editBookDetails = async (req, res) => {
  let data = req.body;
  let query = {
    _id: req.params.id
  };

  if (req.file != undefined) {
    data.book_image = req.file.path;
  } else {
    data.book_image = data.book_image;
  }

  return await bookMaster.findById(query).then(async (result) => {
    if (result && result != null) {
      return await bookMaster
        .findOneAndUpdate(query, { $set: data })
        .then(async (result) => {
          if (result) {
            res.json({
              code: 200,
              status: true,
              message: MESSAGE.editSuccess,
            })
          }
        }).catch((error) => {
          return res.json({
            code: 403,
            status: false,
            message: MESSAGE.invalidID,
            data: {}
          })
        });
    } else {
      return res.json({
        code: 403,
        status: false,
        message: MESSAGE.invalidID,
        data: {}
      })
    }
  }).catch((error) => {
    return res.json({
      code: 403,
      status: false,
      message: MESSAGE.invalidID,
      data: {}
    })
  });
};

/**
 * Delete Book by id
 * @param {ObjectId} bookId
 * @returns {Promise<bookMaster>}
 */

const deleteBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    bookData = await bookMaster.findByIdAndRemove(id);
    if (!bookData) {
      return res.json({
        code: 404,
        status: false,
        message: MESSAGE.invalidID,
        data: {}
      })
    }
    return res.json({
      code: 200,
      status: true,
      message: MESSAGE.deleteSuccess,
      data: {}
    })
  } catch {
    return res.json({
      code: 403,
      status: false,
      message: MESSAGE.invalidID,
      data: {}
    })
  }
};

module.exports = {
  createBookDetails,
  listAllBookDetails,
  editBookDetails,
  deleteBookDetails,
  bookDetail
};
