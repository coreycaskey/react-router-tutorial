import { type Contact } from '~/helpers/global-types';

export interface RootLoaderProps {
  request: Request;
}

export interface RootLoaderData {
  contacts: Contact[];
  searchValue: string | undefined;
}

export interface ContactLoaderData {
  contact: Contact;
}

export interface EditLoaderData {
  contact: Contact;
}
