const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Please enter a valid email",
      ],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{11}$/, "Invalid phone number"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    aboutMe: {
      type: String,
      required: true,
      trim: true,
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
  return await User.find();
}

async function getUserByName(name) {
  return await User.findOne({ name: name });
}

async function createUser(user) {
  return await User.create(user);
}

async function updateUserByName(name, user) {
  return await User.findOneAndUpdate({ name: name }, user, {
    new: true,
    runValidators: true,
  });
}

async function deleteUserByName(name) {
  return await User.findOneAndDelete({ name: name });
}

module.exports = {
  updateUserByName,
  getAllUsers,
  getUserByName,
  createUser,
  deleteUserByName,
};
