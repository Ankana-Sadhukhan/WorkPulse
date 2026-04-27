import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!form.email || !form.password) {
        alert("Please fill in all fields");
        return;
      }
      const res = await API.post("/users/login", form);
      console.log(res.data);
      alert("Login Success");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input placeholder="Email" name="email" onChange={handleChange} />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <button>Login</button>
      </form>
    </div>
  );
}