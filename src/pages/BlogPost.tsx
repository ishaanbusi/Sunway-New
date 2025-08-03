import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Share2, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../utils/api";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  contentType: "markdown" | "richtext";
  excerpt: string;
  createdAt: string;
  tags: string[];
  createdBy: {
    username: string;
  };
  slug: string;
  image?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Fetch individual blog post
  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs/${postSlug}`);

      if (response.data.success) {
        setPost(response.data.data);
        // Fetch related posts based on tags
        if (response.data.data.tags.length > 0) {
          fetchRelatedPosts(response.data.data.tags[0], response.data.data._id);
        }
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Blog post not found");
      } else {
        setError("Failed to load blog post");
      }
      console.error("Fetch post error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch related posts
  const fetchRelatedPosts = async (tag: string, excludeId: string) => {
    try {
      const response = await api.get(
        `/blogs?tag=${encodeURIComponent(tag)}&limit=3`
      );
      if (response.data.success) {
        setRelatedPosts(
          response.data.data.filter((p: BlogPost) => p._id !== excludeId)
        );
      }
    } catch (err) {
      console.error("Failed to fetch related posts:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    } else {
      setError("No blog slug provided");
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gold">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading blog post...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-gold hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gold-light text-xl">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-black min-h-screen">
      {/* Back Button */}
      <div className="sticky top-20 z-10 bg-black/90 backdrop-blur-sm border-b border-gold/20 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="relative h-96 mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 pb-20">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-gold mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gold-light mb-6">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.createdBy.username}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center hover:text-gold transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gold/20 text-gold px-3 py-1 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-gold-light leading-relaxed mb-8 border-l-4 border-gold/30 pl-6">
              {post.excerpt}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          {post.contentType === "markdown" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              //   className="text-gold-light leading-relaxed"
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-serif text-gold mb-4 mt-8">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-serif text-gold mb-3 mt-6">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-serif text-gold mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gold-light leading-relaxed">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gold/30 pl-6 my-6 text-gold-light italic">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gold-light">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="bg-black-lighter px-2 py-1 rounded text-gold font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-black-lighter p-4 rounded-lg overflow-x-auto mb-4 border border-gold/20">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-gold hover:text-gold-light underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          ) : (
            <div
              className="text-gold-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-black-light border-t border-gold/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif text-gold mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-black rounded-lg overflow-hidden border border-gold/20 hover:border-gold/40 transition-colors"
                >
                  {relatedPost.image && (
                    <div className="relative h-32">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif text-gold mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gold-light line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
