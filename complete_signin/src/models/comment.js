const mongoose= require('mongoose');

const comSchema = new mongoose.Schema({
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
        type:String,
        required:true,
    }
})

const Comment = new mongoose.model('Comment',comSchema);
module.exports = Comment;