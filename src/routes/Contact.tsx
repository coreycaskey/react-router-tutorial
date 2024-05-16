import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom';

import { Favorite } from '~/components/Favorite';
import { getContact, updateContact } from '~/helpers/contacts';

import { ContactLoaderData } from './helpers/route-types';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<ContactLoaderData> => {
  const contact = await getContact(params.contactId!);

  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Contact Not Found',
    });
  }

  return { contact };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return updateContact(params.contactId!, {
    favorite: formData.get('favorite') === 'true',
  });
};

export const Contact = () => {
  const { contact } = useLoaderData() as ContactLoaderData;

  return (
    <div id="contact">
      <div>
        <img key={contact.id} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};
