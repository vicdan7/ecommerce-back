const Product = require("./Product")
const Category = require("./Category")
const Car = require("./Car")
const User = require("./User")
const Purchase = require("./Purchase")
const ProductImg = require("./ProductImg")



//Product -> //categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Car -> //userId
Car.belongsTo(User)
User.hasOne(Car)

//Car -> //productId
Car.belongsTo(Product)
Product.hasMany(Car)

//Purchase -> //userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> //productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProductImg -> //productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)

