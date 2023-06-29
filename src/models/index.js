const Product = require("./Product")
const Category = require("./Category")
const Car = require("./Car")
const User = require("./User")

//Product -> //categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Car -> //userId
Car.belongsTo(User)
User.hasOne(Car)

//Car -> //productId
Car.belongsTo(Product)
Product.hasMany(Car)