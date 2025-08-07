const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const {
  getAllUsers,
  getUserByName,
  updateUserByName,
  createUser,
  deleteUserByName,
} = require("./models/User.model.");
const {
  getSkills,
  createSkill,
  deleteSkillById,
  updateSkillById,
  getSkillById,
  getSkillItemById,
  addSkillToGroup,
  deleteSkillFromGroup,
  updateSkillInGroup,
  getAllSkillsItems,
} = require("./models/Skills.model");
const {
  getProjects,
  createProject,
  deleteProjectById,
  updateProjectById,
  getProjectById,
} = require("./models/Projects.model");
const {
  getExperience,
  createExperience,
  deleteExperienceById,
  updateExperienceById,
  getExperienceById,
} = require("./models/Experience.model");
const { error } = require("console");
const { title } = require("process");
const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolioDB")
  .then((_) => {
    console.log("connected to database");
  })
  .catch((_) => console.log("couldn't connect to database"));

app.get("/user", async (req, res) => {
  res.status(200).json(await getAllUsers());
});

app.post("/user", async (req, res) => {
  const user = req.body;
  const createdUser = await createUser(user);
  res.status(201).json(createdUser);
});
app.put("/user/:name", async (req, res) => {
  try {
    const user = await updateUserByName(req.params.name, req.body);
    res.status(200).json(user);
  } catch {
    res.json({ error: "Not found" });
  }
});
app.delete("/user/:name", async (req, res) => {
  try {
    const user = await deleteUserByName(req.params.name);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Skills routes
app.get("/skills", async (req, res) => {
  res.status(200).json(await getSkills());
});
app.post("/skills", async (req, res) => {
  const skill = req.body;
  const createdSkill = await createSkill(skill);
  res.status(201).json(createdSkill);
});
app.delete("/skills/:id", async (req, res) => {
  try {
    const skill = await deleteSkillById(req.params.id);
    if (!skill) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.put("/skills/:id", async (req, res) => {
  try {
    const skill = await updateSkillById(req.params.id, req.body);
    res.status(200).json(skill);
  } catch {
    res.json({ error: "Not found" });
  }
});

// Get skill by ID
app.get("/skills/:id", async (req, res) => {
  const skill = await getSkillById(req.params.id);
  if (!skill) return res.status(404).json({ error: "Not found" });
  res.status(200).json(skill);
});

// Get skill item by ID
app.get("/skills/:groupId/skill-item/:skillId", async (req, res) => {
  const skillItem = await getSkillItemById(
    req.params.groupId,
    req.params.skillId
  );
  if (!skillItem) return res.status(404).json({ error: "Not found" });
  res.status(200).json(skillItem);
});

// Add skill to group
app.post("/skills/:groupId/skill-item", async (req, res) => {
  const skill = req.body;
  const updatedGroup = await addSkillToGroup(req.params.groupId, skill);
  if (!updatedGroup) return res.status(404).json({ error: "Not found" });
  res.status(201).json(updatedGroup);
});

// delete skill from group
app.delete("/skills/:groupId/skill-item/:skillId/", async (req, res) => {
  try {
    const deletedSkill = await deleteSkillFromGroup(
      req.params.groupId,
      req.params.skillId
    );
    if (!deletedSkill) res.status(404).json({ error: "not found" });
    res.json({ message: "skill deleted successfully" });
  } catch {
    res.json({ error: "not found" });
  }
});
//update skill in a group
app.put("/skills/:groupId/skill-item/:skillId", async (req, res) => {
  try {
    const skill = req.body;
    const updatedSkill = await updateSkillInGroup(
      req.params.groupId,
      req.params.skillId,
      {
        title: skill.title,
        percent: skill.percent,
      }
    );
    if (!updatedSkill) res.json({ error: "not updated" });
    res.status(200).json(updatedSkill);
  } catch {
    res.json({ error: "not updated" });
  }
});

// get all skill items
app.get("/skills/:groupId/skill-item", async (req, res) => {
  res.status(200).json(await getAllSkillsItems());
});

// Projects routes
app.get("/projects", async (req, res) => {
  res.status(200).json(await getProjects());
});
app.post("/projects", async (req, res) => {
  const project = req.body;
  const createdProject = await createProject(project);
  res.status(201).json(createdProject);
});
app.put("/projects/:id", async (req, res) => {
  try {
    const project = await updateProjectById(req.params.id, req.body);
    res.status(200).json(project);
  } catch {
    res.json({ error: "not found" });
  }
});

app.delete("/porjects/:id", async (req, res) => {
  try {
    const project = await deleteProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Experience routes
app.get("/experience", async (req, res) => {
  res.status(200).json(await getExperience());
});
app.post("/experience", async (req, res) => {
  const experience = req.body;
  const createdExperience = await createExperience(experience);
  res.status(201).json(createdExperience);
});
app.put("/experience/:id", async (req, res) => {
  try {
    const experience = await updateExperienceById(req.params.id, req.body);
    res.status(200).json(experience);
  } catch {
    res.json({ error: "not found" });
  }
});
app.delete("/experience/:id", async (req, res) => {
  try {
    const experience = await deleteExperienceById(req.params.id);
    if (!experience) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(port, (_) => console.log(`server started at port number ${port}`));
