const mongoose= require('mongoose');

const gymSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        unique:true
    },
    Comments:{
        type:String
    }
})

const Register = new mongoose.model('Register', gymSchema);
module.exports = Register;