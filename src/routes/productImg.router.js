const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const routerProductImg = express.Router();

const upload = require("../utils/multer")

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

routerProductImg.route('/:id')
    .delete(remove)

module.exports = routerProductImg;