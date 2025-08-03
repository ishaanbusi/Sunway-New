import React, { useState, useEffect } from "react";
import { Save, X, Image, Upload, Eye, EyeOff, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

const Editor = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    enabled: true,
    contentType: "markdown" as "markdown" | "richtext",
  });
  const [coverImage, setCoverImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Load post for editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setLoadingPost(true);
      const response = await api.get(`/blogs/admin/all`);

      if (response.data.success) {
        const post = response.data.data.find((p: any) => p._id === postId);
        if (post) {
          setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || "",
            tags: post.tags.join(", "),
            enabled: post.enabled,
            contentType: post.contentType || "markdown",
          });
          if (post.image) {
            setCoverImage(post.image);
            setImagePreview(post.image);
          }
        } else {
          setError("Post not found");
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to load post";
      setError(errorMessage);
    } finally {
      setLoadingPost(false);
    }
  };

  // Handle image file selection and conversion to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setCoverImage(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Remove image
  const removeImage = () => {
    setCoverImage("");
    setImagePreview("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare data
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        enabled: formData.enabled,
        contentType: formData.contentType,
        ...(coverImage && { image: coverImage }),
      };

      // Validation
      if (!postData.title || !postData.content) {
        setError("Title and content are required");
        return;
      }

      let response;
      if (isEditing && id) {
        response = await api.put(`/blogs/${id}`, postData);
      } else {
        response = await api.post("/blogs", postData);
      }

      if (response.data.success) {
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} post`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
      navigate("/admin/dashboard");
    }
  };

  if (loadingPost) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gold">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-black-light rounded-lg border border-gold/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gold-light mb-2"
              >
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                placeholder="Enter post title"
                required
                disabled={loading}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gold-light mb-2"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                rows={3}
                placeholder="Enter post excerpt (optional)"
                disabled={loading}
                maxLength={300}
              />
              <p className="text-xs text-gold-light mt-1">
                {formData.excerpt.length}/300 characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gold-light mb-2"
              >
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                placeholder="Enter tags separated by commas (e.g., massage, wellness, health)"
                disabled={loading}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gold-light mb-2">
                Cover Image
              </label>

              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="max-w-full h-48 object-cover rounded-lg border border-gold/20"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="mt-2 text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gold/20 rounded-lg p-8 text-center mb-4">
                  <Image className="h-12 w-12 text-gold-light mx-auto mb-4" />
                  <p className="text-gold-light mb-2">No image selected</p>
                </div>
              )}

              <div className="flex space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                </label>
                <p className="text-xs text-gold-light self-center">
                  Max 2MB, JPG/PNG/GIF
                </p>
              </div>
            </div>

            {/* Content Type */}
            <div>
              <label
                htmlFor="contentType"
                className="block text-sm font-medium text-gold-light mb-2"
              >
                Content Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={formData.contentType}
                onChange={handleInputChange}
                className="px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                disabled={loading}
              >
                <option value="markdown">Markdown</option>
                <option value="richtext">Rich Text</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gold-light mb-2"
              >
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light font-mono"
                rows={16}
                placeholder={
                  formData.contentType === "markdown"
                    ? "Write your post content in Markdown...\n\n# Heading 1\n## Heading 2\n\n**Bold text**\n*Italic text*\n\n- List item 1\n- List item 2"
                    : "Write your post content here..."
                }
                required
                disabled={loading}
              />
              {formData.contentType === "markdown" && (
                <p className="text-xs text-gold-light mt-1">
                  Use Markdown syntax for formatting. Preview will be available
                  on the frontend.
                </p>
              )}
            </div>

            {/* Status Toggle */}
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleInputChange}
                  className="sr-only"
                  disabled={loading}
                />
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.enabled ? "bg-gold" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
              <span className="text-gold-light flex items-center">
                {formData.enabled ? (
                  <>
                    <Eye className="h-4 w-4 mr-1" /> Published
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" /> Draft
                  </>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editor;
