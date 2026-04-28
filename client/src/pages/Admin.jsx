import { useEffect, useState } from "react";
import {
  getUsers,
  getAttendance,
  getActivity,
  getTotalHours,
} from "../api/adminApi";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [activity, setActivity] = useState(null);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const loadUserData = async (userId) => {
    setSelectedUser(userId);

    const [att, act, total] = await Promise.all([
      getAttendance(userId),
      getActivity(userId),
      getTotalHours(userId),
    ]);

    setAttendance(att.data);
    setActivity(act.data);
    setTotalHours(total.data.total);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>👨‍💼 Admin Dashboard</h1>

      {/* USERS */}
      <div style={styles.card}>
        <h3 style={styles.subHeading}>Select User</h3>
        <div style={styles.userGrid}>
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => loadUserData(u.id)}
              style={{
                ...styles.userBtn,
                ...(selectedUser === u.id && styles.activeUserBtn),
              }}
            >
              👤 User {u.id}
            </button>
          ))}
        </div>
      </div>

      {/* USER DATA */}
      {selectedUser && (
        <div style={styles.card}>
          <h2 style={styles.userTitle}>📊 User {selectedUser}</h2>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <p>Status</p>
              <h3>
                {activity?.status === "online" ? "🟢 Online" : "🔴 Offline"}
              </h3>
            </div>

            <div style={styles.statBox}>
              <p>Total Hours</p>
              <h3>{totalHours.toFixed(2)} hrs</h3>
            </div>
          </div>

          <h3 style={styles.subHeading}>Attendance Logs</h3>

          <div style={styles.logs}>
            {attendance.map((a) => (
              <div key={a.id} style={styles.logCard}>
                <p><b>🕒 Check-In:</b> {a.checkIn}</p>
                <p><b>🏁 Check-Out:</b> {a.checkOut || "—"}</p>
                <p><b>⏳ Hours:</b> {a.totalHours || 0}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#a1cffa",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "50px",
  },
  card: {
    background: "#cae4bdca",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 40px 20px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  subHeading: {
    marginBottom: "10px",
  },
  userGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  userBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    
    cursor: "pointer",
    transition: "0.3s",
  },
  activeUserBtn: {
    background: "#05386d",
  },
  userTitle: {
    marginBottom: "15px",
  },
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  statBox: {
    flex: 1,
    background: "#fafafa",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  logs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  logCard: {
    background: "#852121",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
};