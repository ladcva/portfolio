const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const contentRepository = require("../Repositories/contentRepository");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await contentRepository.list({
      includeDrafts: req.query.includeDrafts === "true",
      type: req.query.type || "blog",
      tag: req.query.tag,
      parentSlug: req.query.parentSlug,
    });
    res.json({ status: 200, data: posts });
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const post = await contentRepository.findBySlug(req.params.slug, req.query.includeDrafts === "true");

    if (!post || post.type !== "blog") {
      return res.status(404).json({ status: 404, message: "Blog post not found" });
    }

    return res.json({ status: 200, data: post });
  })
);

module.exports = router;
