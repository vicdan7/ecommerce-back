const { getAll, create, getOne, remove, update } = require('../controllers/car.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const routerCar = express.Router();

routerCar.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

routerCar.route('/:id')
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerCar;