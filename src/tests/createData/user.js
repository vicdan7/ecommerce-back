const User = require("../../models/User")

const user = async()=>{

    const userCreate = {
        firstName:"Vanessa",
        lastName:"Delgado",
        email:"vanedo155@gmail.com",
        password:"maria123",
        phone:"98765456"
    }

    await User.create(userCreate)
}
module.exports = user