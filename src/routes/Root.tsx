import { useEffect } from 'react';
import {
  NavLink,
  useNavigation,
  useSubmit,
  Form,
  Outlet,
  useLoaderData,
  redirect,
} from 'react-router-dom';

import { createContact, getContacts } from '~/helpers/contacts';

import { SEARCH_PARAM_KEY } from './helpers/route-constants';
import { RootLoaderData, RootLoaderProps } from './helpers/route-types';

export const loader = async ({ request }: RootLoaderProps) => {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get(SEARCH_PARAM_KEY) ?? undefined;
  const contacts = await getContacts(searchValue);

  return { contacts, searchValue };
};

export const action = async () => {
  const contact = await createContact();

  return redirect(`/contacts/${contact.id}/edit`);
};

export const Root = () => {
  const { contacts, searchValue } = useLoaderData() as RootLoaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  /*
    `navigation.location` shows up when the app is navigating to a
    new URL and loading the data
  */

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(SEARCH_PARAM_KEY);

  /*
    DOM manipulation is needed here as the `defaultValue` is set for the input
    on initial render, so any client-side routing that removes the search param
    will maintain the `defaultValue` in the input, even when the list is no longer
    filtered.

    In lieu of DOM manipulation, which is not ideal to begin with, you could create
    a controlled input component via `useState`, but that requires more synchronization
    points as you don't control the URL - the user does
  */
  useEffect(() => {
    if (searchValue !== undefined) {
      const searchInput = (document.getElementById(
        SEARCH_PARAM_KEY
      ) as HTMLInputElement)!;

      searchInput.value = searchValue;
    }
  }, [searchValue]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <div>
          <Form id="search-form" role="search">
            <input
              id="searchValue"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name={SEARCH_PARAM_KEY}
              defaultValue={searchValue}
              onChange={(event) => {
                const isFirstSearch = searchValue === '';
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />

            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
};
