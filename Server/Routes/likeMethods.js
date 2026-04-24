const express = require("express");
const likesData = require("../Models/data");
const env = require("../config/env");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get(
  "/getLikes",
  asyncHandler(async (req, res) => {
    const result = await likesData.findOne({ name: env.portfolioUser }).lean();

    if (!result) {
      return res.status(404).json({ status: 404, message: "Document Not Found" });
    }

    return res.json({ status: 200, data: result.likes });
  })
);

router.post(
  "/updateLikes",
  asyncHandler(async (req, res) => {
    const result = await likesData.findOneAndUpdate(
      { name: env.portfolioUser },
      { $inc: { likes: 1 } },
      { new: true }
    ).lean();

    if (!result) {
      return res.status(404).json({ status: 404, message: "Document Not Found" });
    }

    return res.json({ status: 200, message: "Updated Successfully", data: result.likes });
  })
);

module.exports = router;
