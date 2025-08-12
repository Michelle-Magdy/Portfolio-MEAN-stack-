const mongoose = require("mongoose");
const experienceSchema = new mongoose.Schema({
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Experience = mongoose.model("experience", experienceSchema);

// Sync indexes
Experience.syncIndexes()
  .then(() => console.log("Indexes synced"))
  .catch(() => console.log("Indexes not synced"));

// ✅ CRUD Functions

// Get all Experience groups
async function getExperience() {
  return await Experience.find({ isDeleted: false });
}

// Create a new Experience group
async function createExperience(data) {
  return await Experience.create(data);
}

// Delete Experience group by ID
async function deleteExperienceById(id) {
  return await Experience.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

// ✅ FIXED: complete update function
async function updateExperienceById(id, experience) {
  return await Experience.findByIdAndUpdate(id, experience, {
    new: true,
    runValidators: true,
  });
}

async function getExperienceById(id) {
  return await Experience.findById(id);
}

// Export functions and model (optional, for modular use)
module.exports = {
  Experience,
  getExperience,
  createExperience,
  deleteExperienceById,
  updateExperienceById,
  getExperienceById,
};

// Export functions and model (optional, for modular use)
module.exports = {
  Experience,
  getExperience,
  createExperience,
  deleteExperienceById,
  updateExperienceById,
  getExperienceById,
};
