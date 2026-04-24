const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    type: {
      type: String,
      enum: ["wiki", "blog", "note", "project-doc", "research", "changelog"],
      default: "wiki",
      index: true,
    },
    sourceFormat: {
      type: String,
      enum: ["markdown", "latex", "plaintext"],
      default: "markdown",
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 420,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    parentSlug: {
      type: String,
      default: "",
      index: true,
    },
    relatedSlugs: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: "",
    },
    readingTime: {
      type: String,
      default: "4 min read",
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contentSchema.index({ title: "text", excerpt: "text", body: "text", tags: "text" });
contentSchema.index({ type: 1, parentSlug: 1, sortOrder: 1, publishedAt: -1 });

module.exports = mongoose.model("Content", contentSchema);
