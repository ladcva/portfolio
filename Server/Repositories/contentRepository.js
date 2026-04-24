const Content = require("../Models/content");
const mongoose = require("mongoose");

function assertDatabaseReady() {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
}

function publicQuery(filters = {}) {
  const query = {};
  if (!filters.includeDrafts) query.isPublished = true;
  if (filters.type) query.type = filters.type;
  if (filters.tag) query.tags = filters.tag;
  if (filters.parentSlug !== undefined) query.parentSlug = filters.parentSlug;
  return query;
}

class ContentRepository {
  list(filters = {}) {
    assertDatabaseReady();
    return Content.find(publicQuery(filters))
      .sort({ sortOrder: 1, publishedAt: -1 })
      .select("-__v")
      .lean();
  }

  findBySlug(slug, includeDrafts = false) {
    assertDatabaseReady();
    const query = includeDrafts ? { slug } : { slug, isPublished: true };
    return Content.findOne(query).select("-__v").lean();
  }

  create(payload) {
    assertDatabaseReady();
    return Content.create(payload);
  }

  updateBySlug(slug, payload) {
    assertDatabaseReady();
    return Content.findOneAndUpdate({ slug }, payload, {
      new: true,
      runValidators: true,
    }).lean();
  }

  deleteBySlug(slug) {
    assertDatabaseReady();
    return Content.findOneAndDelete({ slug }).lean();
  }
}

module.exports = new ContentRepository();
