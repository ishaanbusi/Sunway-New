import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, User, ArrowRight, Tag, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  enabled: boolean;
  tags: string[];
  createdBy: {
    username: string;
  };
  slug: string;
  image?: string;
}

const BlogList = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch posts from API
  const fetchPosts = async (page = 1, tag = "") => {
    try {
      setLoading(true);
      const tagParam = tag ? `&tag=${encodeURIComponent(tag)}` : "";
      const response = await api.get(`/blogs?page=${page}&limit=6${tagParam}`);

      if (response.data.success) {
        console.log("Fetched posts:", response.data.data);
        setPosts(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setCurrentPage(response.data.pagination.current);

        // Extract unique tags
        const tags = response.data.data
          .flatMap((post: BlogPost) => post.tags)
          .filter(
            (tag: string, index: number, array: string[]) =>
              array.indexOf(tag) === index
          );
        setAllTags(tags);
      }
    } catch (err: any) {
      setError("Failed to load blog posts");
      console.error("Fetch posts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, selectedTag);
  }, [selectedTag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gold">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading blog posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Wellness Blog
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Insights and articles about wellness, massage, and holistic healing
          </p>
        </div>
      </section>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <section className="py-8 px-4 bg-black-light border-b border-gold/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag === ""
                    ? "bg-gold text-black"
                    : "bg-black-lighter text-gold hover:bg-gold/20"
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? "bg-gold text-black"
                      : "bg-black-lighter text-gold hover:bg-gold/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <section className="py-8 px-4 bg-black">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section ref={ref} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 && !loading ? (
            <div className="text-center text-gold-light py-20">
              <p className="text-xl">No blog posts found.</p>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag("")}
                  className="mt-4 text-gold hover:text-gold-light underline"
                >
                  View all posts
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-black-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gold/20"
                >
                  <div className="relative h-48">
                    <img
                      src={
                        post.image ||
                        "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gold-light mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.createdBy.username}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif text-gold mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gold-light mb-4 line-clamp-3">
                      {post.excerpt || "Click to read the full post..."}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gold/20 text-gold px-2 py-1 rounded flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gold-light">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => fetchPosts(currentPage - 1, selectedTag)}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-gold/20 text-gold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/30 transition-colors"
              >
                Previous
              </button>
              <span className="text-gold-light">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => fetchPosts(currentPage + 1, selectedTag)}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-gold/20 text-gold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/30 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogList;
