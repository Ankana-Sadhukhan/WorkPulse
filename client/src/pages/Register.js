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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Create Account</h2>
        <p style={styles.subtext}>Register to get started</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <select
            name="role"
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {form.role === "admin" && (
            <input
              name="adminKey"
              type="password"
              placeholder="Admin Secret Key"
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  heading: {
    marginBottom: "5px"
  },
  subtext: {
    color: "#777",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s"
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#43cea2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
};