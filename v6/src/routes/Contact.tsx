import {
  type ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

import { Favorite } from "~/components/Favorite";
import { getContact, updateContact } from "~/data/contacts";

import { type ContactLoaderData } from "~/data/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contact = await getContact(params.contactId!);

  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Contact Not Found",
    });
  }

  return { contact } satisfies ContactLoaderData;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return updateContact(params.contactId!, {
    favorite: formData.get("favorite") === "true",
  });
};

export const Contact = () => {
  const { contact } = useLoaderData() as ContactLoaderData;

  return (
    <div id="contact">
      <div>
        <img
          key={contact.id}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
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
              if (!confirm("Please confirm you want to delete this record.")) {
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
