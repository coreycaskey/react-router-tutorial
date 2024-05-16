import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { deleteContact } from '~/helpers/contacts';

export const action = async ({ params }: LoaderFunctionArgs) => {
  await deleteContact(params.contactId!);

  return redirect('/');
};
