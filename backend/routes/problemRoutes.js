const express = require("express");
const Problem = require("../models/Problem");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all problems with user's progress
router.get("/", protect, async (req, res) => {
  try {
    const problems = await Problem.find().sort({ chapter: 1 });

    const user = await User.findById(req.user._id).lean();

    const progressMap = new Map();
    user.progress.forEach((p) => {
      progressMap.set(p.problem.toString(), p.completed);
    });

    const result = problems.map((p) => ({
      _id: p._id,
      chapter: p.chapter,
      title: p.title,
      description: p.description,
      youtubeUrl: p.youtubeUrl,
      leetCodeUrl: p.leetCodeUrl,
      articleUrl: p.articleUrl,
      level: p.level,
      completed: progressMap.get(p._id.toString()) || false
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle completion
router.post("/:id/toggle", protect, async (req, res) => {
  try {
    const problemId = req.params.id;
    let user = await User.findById(req.user._id);

    const existing = user.progress.find(
      (p) => p.problem.toString() === problemId
    );

    if (existing) existing.completed = !existing.completed;
    else user.progress.push({ problem: problemId, completed: true });

    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get Chapters Summary
// Get Chapters Summary
router.get("/chapters/summary", protect, async (req, res) => {
  try {
    const problems = await Problem.find();
    const user = await User.findById(req.user._id).lean();

    const chapters = {};

    problems.forEach((p) => {
      if (!chapters[p.chapter]) {
        chapters[p.chapter] = { total: 0, solved: 0 };
      }
      chapters[p.chapter].total++;

      // yahan ObjectId ko string me compare kar rahe hain
      const solved = user.progress.find(
        (x) =>
          x.completed &&
          x.problem.toString() === p._id.toString()
      );

      if (solved) {
        chapters[p.chapter].solved++;
      }
    });

    const summary = Object.entries(chapters).map(([chapter, data]) => ({
      chapter,
      total: data.total,
      solved: data.solved,
      status:
        data.solved === 0
          ? "Not started"
          : data.solved === data.total
          ? "Completed"
          : "In progress",
    }));

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;