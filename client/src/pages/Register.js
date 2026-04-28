import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminKey: ""
  });

  // ✅ DEFINE FIRST
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ DEFINE SECOND
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", form);

      alert("✅ Registered Successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  // ✅ RETURN LAST
  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />

        <input name="password" type="password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* ✅ SHOW ONLY FOR ADMIN */}
        {form.role === "admin" && (
          <input
            name="adminKey"
            type="password"
            placeholder="Admin Secret Key"
            onChange={handleChange}
          />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}