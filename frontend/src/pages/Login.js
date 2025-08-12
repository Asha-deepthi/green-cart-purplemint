import React, { useState } from "react";
import api from "../api/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/token/", { username, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      onLogin();
    } catch (error) {
      setErr("Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Manager Login</h2>
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {err && <div>{err}</div>}
    </form>
  );
}
