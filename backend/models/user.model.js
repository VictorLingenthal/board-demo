const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
    tim: true,
    minlength: 3
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User
