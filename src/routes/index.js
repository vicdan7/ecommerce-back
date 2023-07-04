const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCar = require('./car.router');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productImg.router');
const router = express.Router();
const verifyJWT = require("../utils/verifyJWT")

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/car', routerCar)
router.use('/purchase', routerPurchase)
router.use('/product_images',verifyJWT, routerProductImg)


module.exports = router;