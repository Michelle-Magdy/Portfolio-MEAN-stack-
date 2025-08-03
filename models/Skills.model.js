const mongoose = require("mongoose");

// Skill item schema (individual skill with title and percent)
const skillItemSchema = new mongoose.Schema({
  title: String,
  percent: Number,
});

// Skills group schema (contains a title, icon, and array of skill items)
const skillsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [skillItemSchema],
});

// ✅ FIXED: use the correct schema name (skillsSchema)
const Skills = mongoose.model("skill", skillsSchema);

// Sync indexes
Skills.syncIndexes()
  .then(() => console.log("Indexes synced"))
  .catch(() => console.log("Indexes not synced"));

// ✅ CRUD Functions

// Get all skill groups
async function getSkills() {
  return await Skills.find();
}

// Create a new skill group
async function createSkill(data) {
  return await Skills.create(data);
}

// Delete skill group by ID
async function deleteSkillById(id) {
  return await Skills.findByIdAndDelete(id);
}

// ✅ FIXED: complete update function
async function updateSkillById(id, skill) {
  return await Skills.findByIdAndUpdate(id, skill, {
    new: true,
    runValidators: true,
  });
}

// Export functions and model (optional, for modular use)
module.exports = {
  Skills,
  getSkills,
  createSkill,
  deleteSkillById,
  updateSkillById,
};
