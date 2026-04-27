import { useEffect, useState } from "react";
import { updateActivity, getActivity, checkIn, checkOut } from "../api/axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Not Working"); // 🔴 default
  const [hours, setHours] = useState(0);
  const [isWorking, setIsWorking] = useState(false);   // ⭐ control state

  // 🔥 FETCH DATA FROM BACKEND
  const fetchData = async () => {
    try {
      const res = await getActivity();

      // keep only latest record per user
      const latestMap = {};
      res.data.forEach(item => {
        latestMap[item.UserId] = item;
      });

      const latestData = Object.values(latestMap);
      setData(latestData);

      // update status from backend
      if (latestData.length > 0) {
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

  // ✅ CHECK-IN
  const handleCheckIn = async () => {
    try {
      await checkIn(1);

      setIsWorking(true);       // 🟢 start tracking
      setStatus("Working");

      alert("✅ Checked In");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Check-In Failed");
    }
  };

  // ✅ CHECK-OUT
  const handleCheckOut = async () => {
    try {
      const res = await checkOut(1);

      const workedHours = res.data.totalHours || 0;

      setIsWorking(false);      // 🔴 stop tracking
      setStatus("Not Working");
      setHours(workedHours);

      alert(`✅ Checked Out | ${workedHours.toFixed(4)} hrs`);

      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Check-Out Failed");
    }
  };

  // 🔁 AUTO ACTIVITY UPDATE (ONLY WHEN WORKING)
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      if (isWorking) {
        updateActivity(1, "online");
        fetchData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isWorking]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard</h2>

      {/* 🔥 STATUS */}
      {/* <h3>
        Status:{" "}
        {status === "Working" ? "🟢 Working" : "🔴 Not Working"}
      </h3> */}

      <h3>
        Status:{" "}
        {status === "Working" ? (
          <span style={{ color: "green" }}>🟢 Working</span>
        ) : (
          <span style={{ color: "red" }}>🔴 Not Working</span>
        )}
      </h3>
      {/* ⏱ TOTAL HOURS */}
      <h3>
        Total Working Time: {hours.toFixed(4)} hrs
      </h3>

      {/* 🔘 BUTTONS */}
      <button onClick={handleCheckIn} style={{ marginRight: "10px" }}>
        Check In
      </button>

      <button onClick={handleCheckOut}>
        Check Out
      </button>

      {/* 📄 ACTIVITY */}
      <h3 style={{ marginTop: "20px" }}>Activity Data:</h3>

      {data.map((item) => (
        <div key={item.id}>
          User: {item.UserId} | Status: {item.status}
        </div>
      ))}
    </div>
  );
}