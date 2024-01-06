const mongoose = require("mongoose");

const commentschema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment_text:{
        type:String
    },
    comment_by:{
        type:String
    }
})

const Comment_Model=mongoose.model('Comment',commentschema);


module.exports=Comment_Model;