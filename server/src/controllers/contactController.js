const contactService = require("../services/contactService");
const Contact = require('../models/contactModel');

async function createContactController(req, res) {
    try {
        const { firstname, lastname, phone } = req.body;
        const userId = req.userId;
        const contact = await contactService.createContact(firstname, lastname, phone, userId);
        res.status(201).json({ message: "Contact créé", contact: {id: contact._id, firstname: contact.email, lastname : contact.lastname, userId : contact.userId} });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateContactController(req, res) {

    const contactId = req.params.id;
    const updates = req.body;

    try {
        const updatedContact = await contactService.updateContact(contactId, updates);

        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact non trouvé' });
        }
        res.json({ message: 'Contact mis à jour', contact: updatedContact });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

async function deleteContactController(req, res) {

    const contactId = req.params.id;

    try {
        const deletedContact = await contactService.deleteContact(contactId);

        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact non trouvé' });
        }
        res.json({ message: 'Contact supprimé'});
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

async function listContactsController(req, res) {
    try{
        const contacts = await Contact.find({userId : req.userId });
        res.json(contacts);
    } catch (err) {
        console.error("Erreur récupération contacts:", err);
        res.status(500).json({ error: err.message });
    }
}

async function listAllContactsController(_req, res) {
    const users = await contactService.getAllContacts();
    res.json(users);
}

module.exports = {
    createContactController,
    updateContactController,
    deleteContactController,
    listContactsController,
    listAllContactsController,
};