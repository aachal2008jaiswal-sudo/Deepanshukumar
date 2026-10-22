"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, writeBatch, serverTimestamp } from "firebase/firestore";

export default function AttendancePage() {
  const [className, setClassName] = useState("10th A");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [stats, setStats] = useState({ present: 0, absent: 0 });

  // Students load karo
  const loadStudents = async () => {
    setLoading(true);
    const q = query(collection(db, "students"), where("class", "==", className));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setStudents(list);
    // Default sab Present
    const defaultAtt = {};
    list.forEach(s => defaultAtt[s.id] = "Present");
    setAttendance(defaultAtt);
    setLoading(false);
  };

  useEffect(() => { loadStudents(); }, [className]);

  const toggleStatus = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present"
    }));
  };

  // Save Attendance - Batch me (infinite ke liye best)
  const saveAttendance = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0]; // 2026-10-22
    const batch = writeBatch(db);
    
    students.forEach(s => {
      const docId = `${today}_${s.id}`;
      const ref = doc(db, "attendance", docId);
      batch.set(ref, {
        studentId: s.id,
        studentName: s.name,
        class: className,
        date: today,
        status: attendance[s.id],
        timestamp: serverTimestamp()
      });
    });

    await batch.commit();
    
    // Stats nikalo
    const p = Object.values(attendance).filter(v => v === "Present").length;
    setStats({ present: p, absent: students.length - p });
    setMsg(`✅ Attendance Save Ho Gayi! Present: ${p}, Absent: ${students.length - p}`);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>C - Manual Attendance</h1>
      
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input style={{ padding: "10px", border: "1px solid #ccc", flex: 1 }} 
          value={className} onChange={e => setClassName(e.target.value)} placeholder="Class likho jaise 10th A" />
        <button onClick={loadStudents} style={{ padding: "10px 20px", background: "#eee", borderRadius: "8px" }}>Load</button>
      </div>

      {stats.present > 0 && (
        <div style={{ marginTop: "15px", padding: "15px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px" }}>
          <b>Dashboard:</b> Aaj Present: {stats.present} | Absent: {stats.absent} | Total: {students.length}
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <div style={{ marginTop: "20px" }}>
          {students.map(s => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee" }}>
              <span>{s.name} (Roll: {s.rollNo})</span>
              <button onClick={() => toggleStatus(s.id)} 
                style={{ padding: "5px 15px", borderRadius: "20px", background: attendance[s.id] === "Present" ? "#22c55e" : "#ef4444", color: "white" }}>
                {attendance[s.id]}
              </button>
            </div>
          ))}
        </div>
      )}

      {students.length > 0 && (
        <button onClick={saveAttendance} disabled={loading}
          style={{ width: "100%", padding: "14px", marginTop: "20px", background: "black", color: "white", borderRadius: "8px", fontWeight: "bold" }}>
          {loading ? "Saving..." : `Save Attendance (${students.length} Students)`}
        </button>
      )}

      {msg && <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>{msg}</p>}
    </div>
  );
}
