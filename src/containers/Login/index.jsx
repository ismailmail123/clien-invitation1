import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useRecipientStore from "../../store/useRecipientStore";
import "./loginRegister.css";
import useAuthStore from "../../store/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useRecipientStore((state) => state.login);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before login attempt
    const token = await login({ email, password }, navigate, setError);
    if (token) {
      setToken(token); // Simpan token ke auth store
      localStorage.setItem('token', token); // Simpan token ke localStorage
      navigate('/'); // Arahkan pengguna ke halaman home setelah login berhasil
    }
  };
  
  

  return (
    <div className="body-loginreg bg-body-secondary">
      <div className="login-container bg-secondary">
        <h2 className="text-center text-light" >
          Login
        </h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="register-link">
            <Link className="text-light" to="/register">Belum punya akun? Daftar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
