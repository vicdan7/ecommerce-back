const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
require("../models")

const BASE_URL_USERS = "/api/v1/users/login"
const BASE_URL = '/api/v1/car'
let TOKEN
let userId
let product
let carId

beforeAll(async()=>{
    const user = {
        email: "vanedo155@gmail.com",
        password: "maria123"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})

test("POST -> 'BASE_URL', should return status code 201 and res.body.quantity === body.quantity", async()=>{

    const productBody = {
        title: "Iphone",
        description: "doceplus",
        price: "189.45"           
    }

    product = await Product.create(productBody)
    
    const carBody = {
        quantity: 1,
        userId,
        productId:product.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(carBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    carId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(carBody.quantity)
})

test("GET -> 'BASE_URL', should status code 200 and res.body.length === 1", async()=>{
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
        
})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.quantity === body.quantity", async()=>{

    const carBody = {
        quantity: 2,
    }

    const res = await request(app)
        .put(`${BASE_URL}/${carId}`)
        .send(carBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(carBody.quantity)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async()=>{

    const res = await request(app)
        .delete(`${BASE_URL}/${carId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    await product.destroy()
})

