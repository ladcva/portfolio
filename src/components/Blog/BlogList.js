import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { fetchBlogPosts } from "../../lib/api";
import fallbackPosts from "../../data/blogPosts";
import { normalizeContentEntries } from "../../lib/content";

function BlogList() {
  const [posts, setPosts] = useState(() => normalizeContentEntries(fallbackPosts));
  const [source, setSource] = useState("local");

  useEffect(() => {
    let cancelled = false;

    fetchBlogPosts()
      .then((remotePosts) => {
        if (!cancelled && remotePosts?.length) {
          setPosts(normalizeContentEntries(remotePosts));
          setSource("api");
        }
      })
      .catch(() => {
        if (!cancelled) setSource("local");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page-section blog-section">
      <div className="section-shell">
        <div className="section-heading section-heading--left wiki-heading">
          <span className="eyebrow">Writing</span>
          <h1>Notebook</h1>
          <p>
            Field notes, essays, project docs, and research scripts. Entries can be Markdown,
            LaTeX-flavored Markdown, or plaintext.
          </p>
        </div>

        <div className="blog-source-pill">{source === "api" ? "API" : "Local drafts"}</div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card-view" key={post.slug}>
              <div className="blog-card-view__meta">
                <span>{new Date(post.publishedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>{post.readingTime || "4 min read"}</span>
                <span>{post.sourceFormat || "markdown"}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="tag-row">
                {(post.tags || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className="button button--ghost" to={`/blog/${post.slug}`}>
                Read post <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default BlogList;
