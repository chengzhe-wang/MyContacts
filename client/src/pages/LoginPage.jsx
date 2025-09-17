import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

export default function LoginPage() {
    return (
    <div>
        <h2>Connexion</h2>
        <Login/>
        <p>
        Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
        </p>
    </div>
    );
}
