import { useEffect, useState } from "react";
import { updateActivity, getActivity, checkIn, checkOut } from "../api/axios";

export default function Home() {
  const userId = localStorage.getItem("userId"); // 🔥 GET USER ID FROM LOCAL STORAGE
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Not Working");
  const [hours, setHours] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getActivity();

      const latestMap = {};
      res.data.forEach(item => {
        latestMap[item.UserId] = item;
      });

      const latestData = Object.values(latestMap);
      setData(latestData);

      if (latestData.length === 0) {
        const currentStatus =
          latestData[0].status === "online"
            ? "Working"
            : "Not Working";

        setStatus(currentStatus);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckIn = async () => {
    try {
      await checkIn(userId);

      setIsWorking(true);
      setStatus("Working");

      alert("✅ Checked In");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Check-In Failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await checkOut(userId);

      const workedHours = res.data.totalHours || 0;

      setIsWorking(false);
      setStatus("Not Working");
      setHours(workedHours);

      alert(`✅ Checked Out | ${workedHours.toFixed(4)} hrs`);

      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Check-Out Failed");
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      if (isWorking) {
        updateActivity(userId, status === "Working" ? "online" : "offline");
        fetchData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isWorking]);

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 CRM Dashboard</h1>
        <p style={styles.subtitle}>Track your daily activity in real time</p>
      </div>

      {/* STATUS CARDS */}
      <div style={styles.cardRow}>
        
        <div style={styles.card}>
          <h3>Status</h3>
          <p style={{
            color: status === "Working" ? "green" : "red",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            {status === "Working" ? "🟢 Working" : "🔴 Not Working"}
          </p>
        </div>

        <div style={styles.card}>
          <h3>Total Hours</h3>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {hours.toFixed(4)} hrs
          </p>
        </div>

      </div>

      {/* BUTTONS */}
      <div style={styles.buttonRow}>
        <button onClick={handleCheckIn} style={styles.checkInBtn}>
          Check In
        </button>

        <button onClick={handleCheckOut} style={styles.checkOutBtn}>
          Check Out
        </button>
      </div>

      {/* ACTIVITY TABLE */}
      <div style={styles.tableCard}>
        <h3>📌 Activity Logs</h3>

        {data.map((item) => (
          <div key={item.id} style={styles.row}>
            <span>User: {item.UserId}</span>
            <span
              style={{
                color: item.status === "online" ? "green" : "gray",
                fontWeight: "bold"
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#bdd2e7",
    minHeight: "100vh"
  },

  header: {
    textAlign: "center",
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "28px"
  },

  subtitle: {
    color: "#666"
  },

  cardRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px"
  },

  checkInBtn: {
    padding: "10px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  checkOutBtn: {
    padding: "10px 20px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  tableCard: {
    height: "150px",
    width: "350px",
    margin: "auto",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(110, 11, 11, 0.1)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #1d550f"
  }
};