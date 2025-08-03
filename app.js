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
} = require("./models/Skills.model");
const {
  getProjects,
  createProject,
  deleteProjectById,
  updateProjectById,
} = require("./models/Projects.model");
const {
  getExperience,
  createExperience,
  deleteExperienceById,
  updateExperienceById,
} = require("./models/Experience.model");
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

app.listen(port, (_) => console.log(`server started at port number ${port}`));
