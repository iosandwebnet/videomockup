"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import "./pages.css";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      // Save login info
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login Successful 🎉");

      setTimeout(() => {
        router.push("/payment"); // Redirect after login
      }, 1500);
    } else {
      toast.error("Invalid username or password ❌");
    }
  };

  return (
    <div className="page-background">
      <Toaster position="top-right" />
      <div className="login-container">
        <div className="left-panel">
          <img src="/videos/login.png" alt="" />
          {/* <p className="signup-text">Don’t have an account? <a href="#">Sign up</a></p> */}
        </div>
        <div className="right-panel">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="input-field"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="input-field"/>
            </div>
            <button type="submit" className="btn-login">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
