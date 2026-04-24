import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { fetchBlogPost } from "../../lib/api";
import fallbackPosts from "../../data/blogPosts";
import ContentRenderer from "../Content/ContentRenderer";
import { resolveContentSource } from "../../lib/content";

function BlogPost() {
  const { slug } = useParams();
  const fallbackPost = useMemo(() => fallbackPosts.find((post) => post.slug === slug), [slug]);
  const [post, setPost] = useState(fallbackPost);

  useEffect(() => {
    let cancelled = false;

    fetchBlogPost(slug)
      .then((remotePost) => {
        if (!cancelled && remotePost) setPost(remotePost);
      })
      .catch(() => {
        if (!cancelled) setPost(fallbackPost);
      });

    return () => {
      cancelled = true;
    };
  }, [fallbackPost, slug]);

  if (!post) {
    return (
      <main className="page-section blog-section">
        <div className="section-shell">
          <Link className="button button--ghost" to="/blog">
            <FiArrowLeft /> Back to writing
          </Link>
          <div className="empty-state">Post not found.</div>
        </div>
      </main>
    );
  }

  const source = resolveContentSource(post);

  return (
    <main className="page-section blog-section">
      <article className="article-shell">
        <Link className="button button--ghost" to="/blog">
          <FiArrowLeft /> Back to writing
        </Link>
        <header>
          <div className="blog-card-view__meta">
            <span>{new Date(post.publishedAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>{post.readingTime || "4 min read"}</span>
            <span>{post.sourceFormat || "markdown"}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="tag-row">
            {(post.tags || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        {source ? (
          <ContentRenderer source={source} sourceFormat={post.sourceFormat || "markdown"} />
        ) : (
          <div className="empty-state">
            This entry exists, but it does not have readable content yet.
          </div>
        )}
      </article>
    </main>
  );
}

export default BlogPost;
