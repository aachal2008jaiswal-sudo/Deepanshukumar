"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [msg, setMsg] = useState("");

  const handleAdd = async () => {
    if (!name || !className || !rollNo) {
      setMsg("Sab field bharo!");
      return;
    }
    try {
      await addDoc(collection(db, "students"), {
        name,
        class: className,
        rollNo,
        createdAt: serverTimestamp(),
      });
      setMsg(`✅ ${name} add ho gaya!`);
      setName(""); setRollNo("");
    } catch (e) {
      setMsg("Error: " + e.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Student Add Karo</h1>
      <p>Infinite students add kar sakte ho</p>
      
      <input style={{ width: "100%", padding: "10px", marginTop: "10px", border: "1px solid #ccc" }} 
        placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
      
      <input style={{ width: "100%", padding: "10px", marginTop: "10px", border: "1px solid #ccc" }} 
        placeholder="Class - jaise 10th A" value={className} onChange={e => setClassName(e.target.value)} />
      
      <input style={{ width: "100%", padding: "10px", marginTop: "10px", border: "1px solid #ccc" }} 
        placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} />

      <button onClick={handleAdd} style={{ width: "100%", padding: "12px", marginTop: "15px", background: "black", color: "white", borderRadius: "8px" }}>
        Add Student
      </button>

      {msg && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{msg}</p>}
    </div>
  );
}
