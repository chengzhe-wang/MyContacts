import { getContacts, createContact, updateContact, deleteContact } from "../api/contact";
import { useEffect, useState } from "react";

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFirstname, setEditFirstname] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editPhone, setEditPhone] = useState("");

    const fetchContacts = async () => {
        try {
            const { data } = await getContacts();
            setContacts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
          await deleteContact(id);
          setContacts(contacts.filter((c) => c._id !== id));
        } catch (err) {
          console.error("Erreur suppression:", err.response?.data || err.message);
        }
    };

    const handleEdit = (contact) => {
        setEditingId(contact._id);
        setEditFirstname(contact.firstName);
        setEditLastname(contact.lastName);
        setEditPhone(contact.phone);
    };
    
    const handleUpdate = async (id) => {
        try {
            await updateContact(id, {
                firstName: editFirstname,
                lastName: editLastname,
                phone: editPhone
            });
            setContacts(contacts.map(c =>
                c._id === id
                    ? { ...c, firstName: editFirstname, lastName: editLastname, phone: editPhone }
                    : c
            ));
            setEditingId(null);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };
    

    return (
        <div>
        <h2>Mes contacts</h2>
        <ul>
            {contacts.map(c => (
            <li key={c._id}>
                {editingId === c._id ? (
              <>
                <input value={editFirstname} onChange={e => setEditFirstname(e.target.value)} placeholder="Prénom" />
                <input value={editLastname} onChange={e => setEditLastname(e.target.value)} placeholder="Nom" />
                <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="Téléphone" />
                <button onClick={() => handleUpdate(c._id)}>Enregistrer</button>
                <button onClick={() => setEditingId(null)}>Annuler</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>
                  {c.firstName} {c.lastName} – {c.phone}
                </span>
                <button onClick={() => handleEdit(c)} style={{ marginRight: "5px" }}>Modifier</button>
                <button onClick={() => handleDelete(c._id)}>Supprimer</button>
              </>
            )}
            </li>
            ))}
        </ul>

        <h3>Ajouter un contact</h3>
        <AddContactForm />
        </div>
    );

    
}



function AddContactForm() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        await createContact(firstname, lastname, phone);
        document.location.reload();
    };

    return (
        <form onSubmit={submit}>
        <input value={firstname} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" />
        <input value={lastname} onChange={e => setLastName(e.target.value)} placeholder="Nom" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" />
        <button type="submit">Ajouter</button>
        </form>
    );
}

