const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Car = require('../models/Car');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll({
        where:{userId},
        include:[
            {
                model:Product,
                include:[Category,ProductImg],
            }
        ],
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const car = await Car.findAll({
        where:{userId},
        attributes:["userId", "productId", "quantity"],
        raw:true
    })
    const result = await Purchase.bulkCreate(car);
    await Car.destroy({where:{userId}})
    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create
}