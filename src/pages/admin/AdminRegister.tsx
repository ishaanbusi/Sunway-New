import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/admin/register", formData);

      if (response.data.success) {
        // Store token and admin data
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.data.admin));

        // Navigate to dashboard
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black-light p-8 rounded-lg shadow-lg border border-gold/20">
        <h2 className="text-3xl font-serif text-gold mb-6 text-center">
          Create Admin Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gold-light mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gold-light mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gold-light mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dark text-black font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gold-light text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-gold hover:text-gold-dark transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
