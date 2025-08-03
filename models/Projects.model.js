const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: {
    type: String,
    required: true,
    trim: true,
  },
  liveDemo: {
    type: String,
    required: true,
    trim: true,
  },
  github: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Projects = mongoose.model("project", projectSchema);

// Sync indexes
Projects.syncIndexes()
  .then(() => console.log("Indexes synced"))
  .catch(() => console.log("Indexes not synced"));

// ✅ CRUD Functions

// Get all skill groups
async function getProjects() {
  return await Projects.find();
}

// Create a new Projects group
async function createProject(data) {
  return await Projects.create(data);
}

// Delete Projects group by ID
async function deleteProjectById(id) {
  return await Projects.findByIdAndUpdate(
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
async function updateProjectById(id, project) {
  return await Projects.findByIdAndUpdate(id, project, {
    new: true,
    runValidators: true,
  });
}
async function getProjectById(id) {
  return await Projects.findById(id);
}

// Export functions and model (optional, for modular use)
module.exports = {
  Projects,
  getProjects,
  getProjectById,
  createProject,
  deleteProjectById,
  updateProjectById,
};
