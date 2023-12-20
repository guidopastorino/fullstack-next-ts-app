const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  dateJoined: {
    type: Number,
    default: Date.now(),
  },
  profileImage: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  blocked: {
    type: Array,
  },
  saved: {
    type: Array,
  },
  likes: {
    type: Array,
  },
  starredPeople: {
    type: Array,
  },
  privateAccount: {
    type: Boolean,
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;