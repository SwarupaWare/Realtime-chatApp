const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: { type:String, require: true },
    email: { type:String, require: true, unique: true },
    password: { type:String, require: true },
    pic: { type:String, require: true, default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestaps: true }
);

// defining instance methods
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
}

// middle ware : pre-save hooks can be utilized to modify the document before it’s saved to the database
userSchema.pre("save", async function (next) {
  if(!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// only ref purpose : static method defined on Model itself
// userSchema.statics.findByName = function(name) {
//   return this.find({ name: new RegExp(name, 'i') });
// };
// virtual() method : Virtual properties in Mongoose are fields that don’t get persisted to MongoDB. 
// They exist only logically and aren’t written to the database. 
// userSchema.virtual('fullName').get(function() {
//   return this.firstName + ' ' + this.lastName;
// });
// To include virtuals in responses set below
// userSchema.set('toObject', { virtuals: true }); 

const User = mongoose.model("User", userSchema);

module.exports = User;