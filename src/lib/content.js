export function resolveContentSource(entry) {
  if (!entry) return "";
  if (typeof entry.body === "string" && entry.body.trim()) return entry.body;
  if (Array.isArray(entry.content)) return entry.content.filter(Boolean).join("\n\n");
  if (typeof entry.content === "string") return entry.content;
  return "";
}

export function normalizeContentEntries(entries) {
  return [...entries].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}
