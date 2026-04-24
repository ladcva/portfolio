import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export async function fetchBlogPosts() {
  const { data } = await api.get("/api/content", {
    params: { type: "wiki" },
  });
  return data.data;
}

export async function fetchBlogPost(slug) {
  const { data } = await api.get(`/api/content/${slug}`);
  return data.data;
}

export default api;
