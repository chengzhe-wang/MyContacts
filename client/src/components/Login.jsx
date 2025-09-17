import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await loginUser(email, password);
            const token = res.data.token;
            localStorage.setItem("token", token);
            setMessage("Connecté !");
            navigate("/contacts");
        } catch (err) {
            setMessage(err.response?.data?.error || "Erreur");
        }
    };

    return (
    <div>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Se connecter</button>

        <p>{message}</p>
    </div>
    );
}
