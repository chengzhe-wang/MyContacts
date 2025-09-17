import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // supprime le token
        navigate("/login");               // redirige vers login
    };

    return (
        <button onClick={handleLogout}>
        Déconnexion
        </button>
    );
}
