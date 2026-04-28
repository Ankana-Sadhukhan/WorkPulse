import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", form);

      localStorage.setItem("userId", res.data.id);

      alert("✅ Login Successful");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      alert("❌ Login Failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Welcome Back</h2>
        <p style={styles.subtext}>Login to continue</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
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
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "380px",
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
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
};