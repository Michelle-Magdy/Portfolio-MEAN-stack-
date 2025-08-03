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
  isDeleted: {
    type: Boolean,
    default: false,
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
  return await Skills.findByIdAndUpdate(
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
async function updateSkillById(id, skill) {
  return await Skills.findByIdAndUpdate(id, skill, {
    new: true,
    runValidators: true,
  });
}

async function getSkillById(id) {
  return await Skills.findById(id);
}

// for skills array
async function getAllSkillsItems() {
  return await Skills.find().select("skills");
}

async function addSkillToGroup(groupId, skill) {
  return await Skills.findByIdAndUpdate(
    groupId,
    {
      $push: { skills: skill },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
async function deleteSkillFromGroup(groupId, skillId) {
  return await Skills.findByIdAndUpdate(
    groupId,
    {
      $pull: { skills: { _id: skillId } },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
async function updateSkillInGroup(groupId, skillId, updatedFields) {
  const setFields = {};
  if ("title" in updatedFields) {
    setFields["skills.$.title"] = updatedFields.title;
  }
  if ("percent" in updatedFields) {
    setFields["skills.$.percent"] = updatedFields.percent;
  }

  return await Skills.findOneAndUpdate(
    { _id: groupId, "skills._id": skillId },
    { $set: setFields },
    { new: true, runValidators: true }
  );
}

async function getSkillItemById(groupId, skillId) {
  const group = await Skills.findById(groupId).lean(); // lean() makes it a plain JS object
  if (!group) return null;

  const skill = group.skills.find((s) => s._id.toString() === skillId);
  return skill || null;
}

// Export functions and model (optional, for modular use)
module.exports = {
  Skills,
  getSkills,
  getSkillById,
  createSkill,
  deleteSkillById,
  updateSkillById,
  addSkillToGroup,
  deleteSkillFromGroup,
  updateSkillInGroup,
  getSkillItemById,
  getAllSkillsItems,
};
