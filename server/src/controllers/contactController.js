const contactService = require("../services/contactService");

async function createContactController(req, res) {
    try {
        const { firstname, lastname, phone } = req.body;
        const contact = await contactService.createContact(firstname, lastname, phone);
        res.status(201).json({ message: "Contact créé", contact: {id: contact._id, firstname: contact.email, lastname : contact.lastname} });
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

async function listContactsController(_req, res) {
    const users = await contactService.getAllContacts();
    res.json(users);
}

module.exports = {
    createContactController,
    updateContactController,
    listContactsController,
};