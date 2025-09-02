import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Optional: simple sanitizer function to remove HTML tags
const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (formData.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;

    setLoading(true);
    try {
    //   const res = await fetch("http://localhost/gr8-onboardingform/admin_login/login.php", {
      const res = await fetch("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/admin_login/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // Sanitize server message before rendering
      const safeMessage = sanitize(data.error || "Login successful.");

      if (res.ok && data.success) {
        setMessage(safeMessage + " Redirecting...");
        setTimeout(() => navigate("/admin-dashboard"), 1000);
      } else {
        throw new Error(safeMessage || "Invalid login.");
      }
    } catch (err) {
      setMessage(sanitize(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && <small className="text-red-600">{sanitize(errors.email)}</small>}
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.password && <small className="text-red-600">{sanitize(errors.password)}</small>}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
