const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Please enter a valid email",
      ],
      unique: true,
    },
    phone: {
      type: String,
      default: "",
      match: [/^[0-9]{11}$/, "Invalid phone number"],
    },
    location: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    aboutMe: {
      type: String,
      default: "",
      trim: true,
    },
    socialLinks: {
      github: {
        type: String,
        trim: true,
        default: "",
      },
      linkedin: {
        type: String,
        trim: true,
        default: "",
      },
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
// sync indexes
User.syncIndexes()
  .then((_) => console.log("indexes synced"))
  .catch((_) => console.log("indexes didn't sync"));

async function getAllUsers() {
  return await User.find({ isDeleted: false });
}

async function getUserByName(name) {
  return await User.findOne({ name: name });
}

async function createUser(user) {
  return User.create(user);
}

async function updateUserById(id, user) {
  return await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
    runValidators: true,
  });
}

async function deleteUserByName(name) {
  return await User.findByIdAndUpdate(
    { name: name },
    {
      $set: { isDeleted: true },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

async function getOneUser() {
  return User.findOne();
}

module.exports = {
  updateUserById,
  getAllUsers,
  getUserByName,
  createUser,
  deleteUserByName,
  getOneUser,
};
