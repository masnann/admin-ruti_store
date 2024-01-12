import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid login");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.data.access_token);
      setError("");
      return true; // Login successful
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed:", error);
      return false; // Login failed
    }
  };

  return { email, setEmail, password, setPassword, error, handleLogin };
}
