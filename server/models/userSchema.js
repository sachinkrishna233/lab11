const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

var userSchema = new Schema({
    _id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

var Users = Mongoose.model('user', userSchema)

module.exports = Users