const request = require("supertest")
const app = require("../app")
require("../models")
const Category = require("../models/Category")

let TOKEN
let category
let productId
const BASE_URL_USERS = "/api/v1/users/login"
const BASE_URL = '/api/v1/products'

beforeAll(async()=>{
    const user = {
        email: "vanedo155@gmail.com",
        password: "maria123"
    }
    
    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)
      
    TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should status code 201 and res.body.title === body.title", async()=>{
    const categoryBody = {
        name: "tech"
    }

    category = await Category.create(categoryBody)

    const product = {
        title: "Iphone",
        description: "doceplus",
        price: "189.45",
        categoryId: category.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
})

test("GET -> 'BASE_URL', should status code 200 and res.body.length === 1", async()=>{

    const res = await request(app)
        .get(BASE_URL)
        

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toBeDefined()
})

test("GET ONE -> 'BASE_URL/:id', should status code 200 and res.body.title === Iphone", async()=>{

    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)
        

    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Iphone")
})

test("PUT -> 'BASE_URL/:id', should status code 200 and res.body.title === body.title", async()=>{

    const product = {
        title: "Samsung"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)
        

    expect(res.status).toBe(200)
    expect(res.body.title).toBe(product.title)
})

test("DELETE -> 'BASE_URL/:id', should status code 204", async()=>{

    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        

    expect(res.status).toBe(204)

    await category.destroy()
  
})