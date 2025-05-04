import { type LoaderFunctionArgs, redirect } from "react-router-dom";

import { deleteContact } from "~/data/contacts";

export const action = async ({ params }: LoaderFunctionArgs) => {
  await deleteContact(params.contactId!);
  return redirect("/");
};
