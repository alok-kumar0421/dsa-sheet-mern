const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    chapter: { type: String, required: true },      
    title: { type: String, required: true },        
    description: { type: String },
    youtubeUrl: { type: String },
    leetCodeUrl: { type: String },
    articleUrl: { type: String },
    level: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);