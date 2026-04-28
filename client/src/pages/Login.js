// import { useState } from "react";
// import API from "../api/axios";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       if (!form.email || !form.password) {
//         alert("Please fill in all fields");
//         return;
//       }
//       const res = await API.post("/users/login", form);
//       console.log(res.data);
//       alert("Login Success");
//     } catch (err) {
//       alert("Login Failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input placeholder="Email" name="email" onChange={handleChange} />
//         <input placeholder="Password" name="password" type="password" onChange={handleChange} />
//         <button>Login</button>
//       </form>
//     </div>
//   );
// }

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

      // 🔥 VERY IMPORTANT LINE
      localStorage.setItem("userId", res.data.id);

      alert("✅ Login Successful");

//       if (res.data.role === "admin") {
//   navigate("/admin");   // 👈 ADMIN PAGE
// } else {
//   navigate("/home");      // 👈 USER HOME
// }
      if (res.data.role === "admin") {
        navigate("/admin");   // 👈 ADMIN PAGE
      } else {
        navigate("/home");      // 👈 USER HOME
      }

      // go to Home

    } catch (err) {
      alert("❌ Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "50px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};