import api from "./api";

export const registerUser = async (email, password) => {
    return api.post("/auth/register", { email, password });
};

export const loginUser = async (email, password) => {
    return api.post("/auth/login", { email, password });   
};
