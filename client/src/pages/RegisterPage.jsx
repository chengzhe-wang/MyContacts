import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";

export default function RegisterPage() {
  return (
    <div>
      <h2>Inscription</h2>
      <Register/>
      <p>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}
