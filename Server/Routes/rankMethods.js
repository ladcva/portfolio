const express = require("express");
const rankData = require("../Models/data");
const env = require("../config/env");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get(
  "/getRanks",
  asyncHandler(async (req, res) => {
    const result = await rankData.findOne({ name: env.portfolioUser }).lean();

    if (!result) {
      return res.status(404).json({ status: 404, message: "Document Not Found" });
    }

    return res.json({
      status: 200,
      data: {
        spojRank: result.spojRank,
        hackerrank: result.hackerrank,
        cgpa: result.cgpa,
        sem: result.sem,
      },
    });
  })
);

module.exports = router;
