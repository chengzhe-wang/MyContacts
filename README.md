# MyContacts

Application web pour gérer vos contacts, construite avec **Node.js**, **Express**, **MongoDB** et **React**.

---

## Liens

Frontend :
https://mycontacts-chengzhe.netlify.app/

Backend/Swagger :
https://mycontacts-qzj8.onrender.com/api-docs/

Veillez à bien lancer le lien backend en amont pour lancer le serveur, sinon le site risque de ne pas marcher.

### Swagger

Sélectionnez le serveur
```
https://mycontacts-qzj8.onrender.com - Render Server
```
Dans le swagger hébergé sur Render.

### Connexion

Identifiants de test :

```
test@efrei.net | 123
test@gmail.com | password123
```

## Prérequis

- Node.js (18+)
- MongoDB Atlas
- npm

---

## Installation

```bash
git clone https://github.com/ton-utilisateur/MyContacts.git
cd MyContacts/server
npm install
```

### Créer le fichier `.env`

Crée un fichier `.env` à la racine du serveur avec le contenu suivant :

```env
MONGO_URI=<ton_uri_mongodb>
MONGO_URI_TEST=<ton_uri_mongodb_test>
JWT_TOKEN=<secret_jwt>
PORT=3001
```

### Lancer le server

### Backend
```bash
cd server
npm install
npm start
```

Serveur : http://localhost:3001

### Frontend

```bash
cd ../client
npm install
npm start
```

Front-end : http://localhost:3000

### Documentation API

Swagger disponible sur : http://localhost:3001/api-docs

Les deux serveurs marchent si vous êtes en local.

## Authentification

- **Inscription** : `POST /auth/register`
- **Connexion** : `POST /auth/login`

> ⚠️ Un token JWT est nécessaire pour accéder aux routes contacts.  

Pour générer le token :

```bash
node
require('crypto').randomBytes(64).toString('hex')
```
## Routes Contacts

| Méthode | Route | Description |
|---------|-------|-------------|
| POST    | /contacts/create      | Créer un contact |
| GET     | /contacts/list        | Lister les contacts de l'utilisateur |
| PATCH   | /contacts/update/:id  | Mettre à jour un contact |
| DELETE  | /contacts/delete/:id  | Supprimer un contact |

### Tests

Pour lancer les tests backend (Jest) :

```bash
cd server
npm test
```

