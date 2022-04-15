const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  username: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
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
  timedBlock: {
    type: Date,
    default: null
  },
  blockReason: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'register',
    enum: ['register', 'active', 'blocked', 'deleted']
  },
  socialMedia: {
    facebook: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
    youtube: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    github: {
      type: String,
      default: null
    },
    gitlab: {
      type: String,
      default: null
    },
    bitbucket: {
      type: String,
      default: null
    },
    website: {
      type: String,
      default: null
    },
    other: {
      type: String,
      default: null
    }
  },
  notifications: {
    admin: {
      type: Boolean,
      default: true
    },
    follow: {
      type: Boolean,
      default: true
    },
    like: {
      type: Boolean,
      default: true
    },
    comment: {
      type: Boolean,
      default: true
    },
  },
}, {
  timestamps: true
});

schema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.timedBlock;
  delete obj.isBlocked;
  delete obj.blockReason;
  delete obj.isActive;
  return obj;
};


module.exports = mongoose.model("User", schema);