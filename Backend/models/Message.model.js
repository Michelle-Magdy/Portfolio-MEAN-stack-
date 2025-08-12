const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("message", messageSchema);
// Sync indexes
Message.syncIndexes()
  .then(() => console.log("Indexes synced"))
  .catch(() => console.log("Indexes not synced"));

async function getMessages() {
  try {
    return await Message.find({ isDeleted: false });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

async function createMessage(data) {
  try {
    return await Message.create(data);
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

async function deleteMessageById(id) {
  try {
    return await Message.findByIdAndUpdate(
      id,
      {
        $set: { isDeleted: true },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

module.exports = { Message, getMessages, createMessage, deleteMessageById };
