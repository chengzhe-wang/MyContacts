const Contact = require('../models/contactModel');
const jwt = require('jsonwebtoken');

async function createContact(firstName, lastName, phone, userId) {
    const contact = new Contact({ firstName, lastName, phone, userId });
    await contact.save();
    return contact;
}

async function updateContact(contactId, updates) {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updates, { new: true });
    return updatedContact;
}

async function deleteContact(contactId) {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
}


async function getAllContacts() {
    return Contact.find();
}

module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getAllContacts,
};