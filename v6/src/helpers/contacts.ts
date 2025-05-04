import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

import { STORAGE_KEY } from '~/helpers/global-constants';
import { type Contact, type FakeCache } from '~/helpers/global-types';

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: FakeCache = {};

const fakeNetwork = async (key: string = '') => {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;

  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
};

export const getContacts = async (query: string = '') => {
  await fakeNetwork(`getContacts:${query}`);

  let contacts = await get();

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
  }

  return contacts.sort(sortBy('last', 'createdAt'));
};

export const createContact = async () => {
  await fakeNetwork();

  const id = Math.random().toString(36).substring(2, 9);
  const contact: Contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);

  await set(contacts);

  return contact;
};

export const getContact = async (id: string) => {
  await fakeNetwork(`contact:${id}`);

  const contacts = await get();
  const contact = contacts.find((contact) => contact.id === id);

  return contact;
};

export const updateContact = async (id: string, updates: Partial<Contact>) => {
  await fakeNetwork();

  const contacts = await get();
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }

  Object.assign(contact, updates);

  await set(contacts);

  return contact;
};

export const deleteContact = async (id: string) => {
  const contacts = await get();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index > -1) {
    contacts.splice(index, 1);

    await set(contacts);

    return true;
  }

  return false;
};

const set = (contacts: Contact[]) => {
  return localforage.setItem(STORAGE_KEY, contacts);
};

const get = async () => {
  return ((await localforage.getItem(STORAGE_KEY)) ?? []) as Contact[];
};
