import styles from "./LoginForm.module.css";
import { useState, useContext } from "react";
import CampoTextoFormAuth from "../CampoTextoFormAuth/CampoTextoFormAuth";
import api from "../../api";
import { AuthContext } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log({ username, password });
    try {
      const response = await api.post(
        "login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      login(response.data.token, response.data.user);
      setPassword("");
      setUsername("");
      navigate("/chat");
    } catch (error) {
      setPassword("");
      setUsername("");
      alert("Usuário ou senha inválidos.");
    }
  }

  return (
    <form className={styles.formularioLogin} onSubmit={handleSubmit}>
      <CampoTextoFormAuth
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <CampoTextoFormAuth
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
