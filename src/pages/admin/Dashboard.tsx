import { useState, useEffect } from "react";
import {
  PlusCircle,
  Pencil,
  Trash,
  Search,
  Eye,
  EyeOff,
  Loader,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { getAdmin, logout } from "../../utils/auth";

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
}

const Dashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const navigate = useNavigate();
  const admin = getAdmin();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  // Fetch posts from backend
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs/admin/all?page=${page}&limit=10`);

      if (response.data.success) {
        setPosts(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setCurrentPage(response.data.pagination.current);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch posts";
      setError(errorMessage);
      console.error("Fetch posts error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDelete = async (postId: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      setDeleteLoading(postId);
      const response = await api.delete(`/blogs/${postId}`);

      if (response.data.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        // Show success message (you can add a toast notification here)
        console.log("Post deleted successfully");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete post";
      alert(errorMessage);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Toggle post enabled/disabled status
  const handleToggleStatus = async (postId: string) => {
    try {
      setToggleLoading(postId);
      const response = await api.patch(`/blogs/${postId}/toggle`);

      if (response.data.success) {
        setPosts(
          posts.map((post) =>
            post._id === postId
              ? { ...post, enabled: response.data.data.enabled }
              : post
          )
        );
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update post status";
      alert(errorMessage);
    } finally {
      setToggleLoading(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.enabled) ||
      (statusFilter === "draft" && !post.enabled);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gold">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-gold">Blog Dashboard</h1>
            <p className="text-gold-light mt-2">
              Welcome back, {admin?.username}!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin/create-post")}
              className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-black-light rounded-lg border border-gold/20 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-light" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          {/* Posts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-4 text-gold-light">Title</th>
                  <th className="text-left py-3 px-4 text-gold-light">Date</th>
                  <th className="text-left py-3 px-4 text-gold-light">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gold-light">Tags</th>
                  <th className="text-right py-3 px-4 text-gold-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-gold-light"
                    >
                      {searchTerm
                        ? "No posts found matching your search."
                        : "No posts found. Create your first post!"}
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b border-gold/10 hover:bg-black-lighter"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <h3 className="text-gold font-medium">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gold-light truncate max-w-md">
                            {post.excerpt || "No excerpt available..."}
                          </p>
                          <p className="text-xs text-gold-light mt-1">
                            by {post.createdBy.username}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gold-light">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.enabled
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.enabled ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gold/20 text-gold px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gold-light">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end space-x-2">
                          {/* View Post */}
                          <button
                            onClick={() =>
                              window.open(`/blog/${post.slug}`, "_blank")
                            }
                            className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                            title="View Post"
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          {/* Toggle Status */}
                          <button
                            onClick={() => handleToggleStatus(post._id)}
                            className="p-2 text-gold hover:text-gold-light transition-colors"
                            disabled={toggleLoading === post._id}
                            title={
                              post.enabled ? "Disable Post" : "Enable Post"
                            }
                          >
                            {toggleLoading === post._id ? (
                              <Loader className="h-5 w-5 animate-spin" />
                            ) : post.enabled ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() =>
                              navigate(`/admin/edit-post/${post._id}`)
                            }
                            className="p-2 text-gold hover:text-gold-light transition-colors"
                            title="Edit Post"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(post._id, post.title)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors"
                            disabled={deleteLoading === post._id}
                            title="Delete Post"
                          >
                            {deleteLoading === post._id ? (
                              <Loader className="h-5 w-5 animate-spin" />
                            ) : (
                              <Trash className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => fetchPosts(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gold/20 text-gold rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gold-light">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => fetchPosts(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gold/20 text-gold rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
