import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
    try {
        await registerUser(email, password);
        setMessage("Inscription réussie !");
        navigate("/login");
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

        <button onClick={handleRegister}>S'inscrire</button>

        <p>{message}</p>
    </div>
    );
}
