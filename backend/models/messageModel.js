const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, ref : "User"},
    content : {type: String, trim: true},
    chat : {type :mongoose.Schema.Types.ObjectId, ref : "Chat"}
},
{timestamps:true});  // adds createdAt and updatedAt fields with dates


const Message = mongoose.model("Message", messageModel);

module.exports = Message;