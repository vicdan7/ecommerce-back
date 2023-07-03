const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const Car = require("../models/Car")
require("../models")

const BASE_URL_USERS = "/api/v1/users/login"
const BASE_URL = '/api/v1/purchase'
let TOKEN
let userId
let product

beforeAll(async()=>{
    const user = {
        email:"vanedo155@gmail.com",
        password:"maria123"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})

test("POST - > 'BASE_URL', should resturn status code 201 and res.body.quantity === body.quantity", async()=>{
    const productBody = {
        title:"Nokia",
        description:"lorem12",
        price:"124.65"
    }

    product = await Product.create(productBody)

    const carBody = {
        quantity:3,
        userId,
        productId:product.id
    }

    await Car.create(carBody)

    const res = await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(carBody.quantity)
})

test("GET -> 'BASE_URL', should return status code 200 res.body.length === 1", async()=>{
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await product.destroy()
        
})
