const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserregisterSchema = new Schema({
  first_name: {type: String, required:true },
  last_name: {type: String, required:true  },
  email:{type:String, required:true},
  password:{type:String,required:true }
});

const UserregisterModel = model('register', UserregisterSchema);

module.exports = UserregisterModel;