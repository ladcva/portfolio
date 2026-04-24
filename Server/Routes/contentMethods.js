const express = require("express");
const { z } = require("zod");
const asyncHandler = require("../middleware/asyncHandler");
const requireBlogAdmin = require("../middleware/requireBlogAdmin");
const contentRepository = require("../Repositories/contentRepository");

const router = express.Router();

const contentPayloadSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(["wiki", "blog", "note", "project-doc", "research", "changelog"]).default("wiki"),
  sourceFormat: z.enum(["markdown", "latex", "plaintext"]).default("markdown"),
  excerpt: z.string().trim().min(20).max(420),
  body: z.string().min(1),
  tags: z.array(z.string().trim().min(1).max(40)).max(16).default([]),
  parentSlug: z.string().trim().max(120).default(""),
  relatedSlugs: z.array(z.string().trim().max(120)).max(24).default([]),
  coverImage: z.string().trim().url().optional().or(z.literal("")),
  readingTime: z.string().trim().max(40).default("4 min read"),
  sortOrder: z.number().int().default(0),
  publishedAt: z.coerce.date().default(() => new Date()),
  isPublished: z.boolean().default(true),
});

const contentPatchSchema = contentPayloadSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required",
});

function parsePayload(schema, body) {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const error = new Error("Invalid content payload");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }
  return parsed.data;
}

function readFilters(req) {
  return {
    includeDrafts: req.query.includeDrafts === "true",
    type: req.query.type,
    tag: req.query.tag,
    parentSlug: req.query.parentSlug,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const entries = await contentRepository.list(readFilters(req));
    res.json({ status: 200, data: entries });
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const entry = await contentRepository.findBySlug(req.params.slug, req.query.includeDrafts === "true");

    if (!entry) {
      return res.status(404).json({ status: 404, message: "Content entry not found" });
    }

    return res.json({ status: 200, data: entry });
  })
);

router.post(
  "/",
  requireBlogAdmin,
  asyncHandler(async (req, res) => {
    const payload = parsePayload(contentPayloadSchema, req.body);
    const entry = await contentRepository.create(payload);
    res.status(201).json({ status: 201, data: entry });
  })
);

router.put(
  "/:slug",
  requireBlogAdmin,
  asyncHandler(async (req, res) => {
    const payload = parsePayload(contentPayloadSchema, req.body);
    const entry = await contentRepository.updateBySlug(req.params.slug, payload);

    if (!entry) {
      return res.status(404).json({ status: 404, message: "Content entry not found" });
    }

    return res.json({ status: 200, data: entry });
  })
);

router.patch(
  "/:slug",
  requireBlogAdmin,
  asyncHandler(async (req, res) => {
    const payload = parsePayload(contentPatchSchema, req.body);
    const entry = await contentRepository.updateBySlug(req.params.slug, payload);

    if (!entry) {
      return res.status(404).json({ status: 404, message: "Content entry not found" });
    }

    return res.json({ status: 200, data: entry });
  })
);

router.delete(
  "/:slug",
  requireBlogAdmin,
  asyncHandler(async (req, res) => {
    const entry = await contentRepository.deleteBySlug(req.params.slug);

    if (!entry) {
      return res.status(404).json({ status: 404, message: "Content entry not found" });
    }

    return res.status(204).send();
  })
);

module.exports = router;
