import React, {  useState } from "react";
import useRecipientStore from "../../store/useRecipientStore";
import { Link, useNavigate } from "react-router-dom";
import "../Login/loginRegister.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const errorMessage = useRecipientStore((state) => state.errorMessage);

  const register = useRecipientStore((state) => state.register);

  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();

    await register({ username, email, password,address},
          navigate,      
          setError,);

   
};

 

  return (
    <div className="body-loginreg bg-body-secondary">
      <div className="login-container bg-secondary">
        <h2 className="text-center text-light">
          Register
        </h2>
        <form onSubmit={handleRegister}>
        {errorMessage == "Password is too weak" && <div className="alert alert-danger">{errorMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
                      
          <div className="mb-3">
            <label htmlFor="new-username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="new-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new-email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="new-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p style={{fontSize: "0.7rem", textWrap: "wrap", lineHeight: "15px",}}>Password harus berisi minimal 8 karakter yang terdiri dari huruf kapital, huruf kecil, angka dan simbol</p>
          </div>
          <div className="mb-3">
            <label htmlFor="new-last-name" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="new-last-name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div className="login-link">
            <Link className="text-light" to="/login">Sudah punya akun? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
