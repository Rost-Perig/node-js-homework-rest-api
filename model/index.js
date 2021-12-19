
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from './contacts.json';

import { fileURLToPath } from 'url'; 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => contacts;

const getContactById = async (contactId) => contacts.filter(item => item.id === contactId)[0];

const removeContact = async (contactId) => {
    const index = contacts.findIndex(item => item.id === contactId);
    if (index !== -1) {
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(
            path.join(__dirname, 'contacts.json'),
            JSON.stringify(contacts, null, 2)
        );
        return result;
    };
    return null;
};

const addContact = async ({name, email, phone}) => {
    const newContact = { name, email, phone, id: randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(
        path.join(__dirname, 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return newContact;
};

const updateContact = async (contactId, body) => {
    const index = contacts.findIndex(item => item.id === contactId);
    if (index !== -1) {
        const updatedContact = { id: contactId, ...contacts[index], ...body };
        contacts[index] = updatedContact;
        await fs.writeFile(
            path.join(__dirname, 'contacts.json'),
            JSON.stringify(contacts, null, 2)
        );
        return updatedContact;
    };
    return null;
 };

export default { listContacts, getContactById, removeContact, addContact, updateContact };
