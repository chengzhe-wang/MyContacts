import api from "./api";

export const getAllContacts = async () => {
    return api.get("/contacts/list");
}

export const createContact = async (firstName, lastName, phone) => {
    return api.post("/auth/register", { firstName, lastName, phone });
};

export const updateContact = async (id, updates) => {
    return api.patch(`/contacts/update/${id}`, updates );
};

export const deleteContact = async (id) => {
    return api.patch(`/contacts/delete/${id}`);
};

