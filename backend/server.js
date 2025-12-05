const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const Problem = require("./models/Problem");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));

// Seed sample data if DB empty
const seedProblems = async () => {
  const count = await Problem.countDocuments();
  if (count === 0) {
    console.log("Seeding sample problems...");
    await Problem.insertMany([
      {
        chapter: "Arrays",
        title: "Two Sum",
        description: "Find two numbers that add up to target.",
        youtubeUrl: "https://www.youtube.com/results?search_query=two+sum",
        leetCodeUrl: "https://leetcode.com/problems/two-sum/",
        articleUrl: "https://takeuforward.org/data-structure/2-sum-problem/",
        level: "Easy"
      },
      {
        chapter: "Arrays",
        title: "Kadane's Algorithm",
        description: "Maximum subarray sum.",
        youtubeUrl: "https://www.youtube.com/results?search_query=kadane+algorithm",
        leetCodeUrl: "https://leetcode.com/problems/maximum-subarray/",
        articleUrl: "https://takeuforward.org/data-structure/kadanes-algorithm/",
        level: "Medium"
      },
      {
        chapter: "Linked List",
        title: "Reverse Linked List",
        description: "Reverse a singly linked list.",
        youtubeUrl: "https://www.youtube.com/results?search_query=reverse+linked+list",
        leetCodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
        articleUrl: "https://takeuforward.org/data-structure/reverse-a-linked-list/",
        level: "Easy"
      },
      // 🟦 Strings
{
  chapter: "Strings",
  title: "Longest Common Prefix",
  description: "Find common prefix among array of strings.",
  youtubeUrl: "https://youtu.be/0sWShKIJoo4",
  leetCodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
  articleUrl: "https://takeuforward.org/data-structure/longest-common-prefix/",
  level: "Easy"
},
{
  chapter: "Strings",
  title: "Valid Anagram",
  description: "Check if two strings are anagram.",
  youtubeUrl: "https://youtu.be/9UtInBqnCgA",
  leetCodeUrl: "https://leetcode.com/problems/valid-anagram/",
  articleUrl: "https://takeuforward.org/data-structure/check-if-two-strings-are-anagram/",
  level: "Easy"
},

// 🟦 Stack & Queue
{
  chapter: "Stack & Queue",
  title: "Valid Parenthesis",
  description: "Use stack to check valid parentheses.",
  youtubeUrl: "https://youtu.be/WTzjTskDFMg",
  leetCodeUrl: "https://leetcode.com/problems/valid-parentheses/",
  articleUrl: "https://takeuforward.org/data-structure/valid-parentheses/",
  level: "Easy"
},
{
  chapter: "Stack & Queue",
  title: "Min Stack",
  description: "Stack supporting getMin in O(1).",
  youtubeUrl: "https://youtu.be/qkLl7nAwDPo",
  leetCodeUrl: "https://leetcode.com/problems/min-stack/",
  articleUrl: "https://takeuforward.org/data-structure/min-stack/",
  level: "Medium"
},

// 🟦 Trees
{
  chapter: "Trees",
  title: "Binary Tree Level Order Traversal",
  description: "BFS traversal by levels.",
  youtubeUrl: "https://youtu.be/EoAsWbO7sqg",
  leetCodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  articleUrl: "https://takeuforward.org/data-structure/level-order-traversal/",
  level: "Easy"
},

// 🟦 Graph
{
  chapter: "Graph",
  title: "DFS Traversal",
  description: "Graph depth-first traversal.",
  youtubeUrl: "https://youtu.be/uDWljP2PGmU",
  leetCodeUrl: "",
  articleUrl: "https://takeuforward.org/graph/dfs-traversal-in-graph/",
  level: "Medium"
}

]);
    console.log("Sample problems add ho gya.");
  }
};

seedProblems();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));