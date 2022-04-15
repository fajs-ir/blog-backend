const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin"
  },
  avatar: {
    original: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


module.exports = mongoose.model("Admin", schema);