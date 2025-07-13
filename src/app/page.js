import React from "react";

export default function HomePage() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column"
  
    }}>
      <h1 className="text-center md:text-4xl text-2xl">Welcome to Yojna Connect</h1>
      <a href="/login" style={{
        marginTop: "2rem",
        padding: "0.75rem 2rem",
        fontSize: "1.25rem",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        textDecoration: "none",
        cursor: "pointer"
      }}>
        Login
      </a>
    </div>
  );
}
