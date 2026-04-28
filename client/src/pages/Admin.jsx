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

  // 🔹 Load users
  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  // 🔹 Load selected user data
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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>👨‍💼 Admin Dashboard</h1>

      {/* USERS */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select User</h3>
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => loadUserData(u.id)}
            style={{
              margin: "5px",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            User {u.id}
          </button>
        ))}
      </div>

      {/* USER DATA */}
      {selectedUser && (
        <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
          <h2>📊 User {selectedUser}</h2>

          <p>
            Status:{" "}
            {activity?.status === "online" ? "🟢 Online" : "🔴 Offline"}
          </p>

          <p>Total Hours: {totalHours.toFixed(2)} hrs</p>

          <h3>Attendance Logs</h3>

          {attendance.map((a) => (
            <div key={a.id} style={{ marginBottom: "10px" }}>
              <b>CheckIn:</b> {a.checkIn} <br />
              <b>CheckOut:</b> {a.checkOut || "—"} <br />
              <b>Hours:</b> {a.totalHours || 0}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}