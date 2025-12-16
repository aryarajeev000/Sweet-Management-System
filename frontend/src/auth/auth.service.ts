import axios from "axios";

const AUTH_API = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "https://sweet-management-system-9vw4.onrender.com",
});

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const res = await AUTH_API.post("/auth/login", { email, password });

  if (!res.data?.token) {
    throw new Error("Invalid response from server");
  }

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role?.toLowerCase());

  return res.data;
};

export const register = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const res = await AUTH_API.post("/auth/register", { email, password });
  return res.data;
};

export const logout = () => {
  localStorage.clear();
};
