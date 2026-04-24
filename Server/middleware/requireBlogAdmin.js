const env = require("../config/env");

function requireBlogAdmin(req, res, next) {
  if (!env.blogAdminToken) {
    return res.status(503).json({
      status: 503,
      message: "BLOG_ADMIN_TOKEN is not configured",
    });
  }

  const token = req.get("x-blog-admin-token") || "";
  if (token !== env.blogAdminToken) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  return next();
}

module.exports = requireBlogAdmin;
