import React from "react";
import ShowContacts from "../components/ShowContacts";
import LogoutButton from "../components/Logout";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {

    if (localStorage.getItem("token")) {
        return(
            <div>
                <ShowContacts/>
                <LogoutButton/>
            </div>
        )
        
    } else {
        return(
            <Navigate to="/login" replace />
        )
    }
}