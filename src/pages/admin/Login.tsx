import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

// Create axios instance with base configuration
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
// });

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/admin/login", {
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // Store token and admin data
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.data.admin));

        // Set token for future requests
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;

        // Navigate to dashboard
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black-light p-8 rounded-lg shadow-lg border border-gold/20">
        <h2 className="text-3xl font-serif text-gold mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gold-light mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-gold-light text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-gold hover:text-gold-dark transition-colors"
            >
              Create Admin Account
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
