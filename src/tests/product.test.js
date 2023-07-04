const request = require("supertest")
const app = require("../app")
require("../models")
const Category = require("../models/Category")
const ProductImg = require("../models/ProductImg")

let TOKEN
let category
let productId
let productImg
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

test("GET -> 'BASE_URL', should status code 200, res.body.length === 1 and res.body[0] to be defined", async()=>{

    const res = await request(app)
        .get(BASE_URL)
        
   
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].ProductImgs).toBeDefined()
    
})

test("GET -> 'BASE_URL?category = category.id', should status code 200, res.body.length === 1 and res.body[0] to be defined", async()=>{

    const res = await request(app)
        .get(`${BASE_URL}?category=${category.id}`)
        

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].ProductImgs).toBeDefined()
})

test("GET ONE -> 'BASE_URL/:id', should status code 200 and res.body.title === Iphone", async()=>{

    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)
        

    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Iphone")
    expect(res.body.category).toBeDefined()
    expect(res.body.ProductImgs).toBeDefined()
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

test("POST -> 'BASE_URL/:id/images', should return status code 200, and res.body.length === 1", async()=>{
    const productImgBody = {
        url:"http://localhost:8080/uploads/img.png",
        filename:"img.png",
        productId
    }

    productImg = await ProductImg.create(productImgBody)

    const res = await request(app)
        .post(`${BASE_URL}/${productId}/images`)
        .send([productImg.id])
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("DELETE -> 'BASE_URL/:id', should status code 204", async()=>{

    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        

    expect(res.status).toBe(204)

    await category.destroy()
    await productImg.destroy()
  
})