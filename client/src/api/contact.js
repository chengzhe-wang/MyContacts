import api from "./api";

export const getContacts = async () => {
    return api.get("/contacts/list");
}

export const createContact = async (firstname, lastname, phone) => {
    return api.post("/contacts/create", { firstname, lastname, phone });
};

export const updateContact = async (id, updates) => {
    return api.patch(`/contacts/update/${id}`, updates );
};

export const deleteContact = async (id) => {
    return api.delete(`/contacts/delete/${id}`);
};

