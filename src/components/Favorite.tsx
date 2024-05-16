import { useFetcher } from 'react-router-dom';

import { Contact } from '~/helpers/global-types';

interface FavoriteProps {
  contact: Contact;
}

export const Favorite: React.FC<FavoriteProps> = ({ contact }) => {
  const fetcher = useFetcher();

  const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite;

  /*
    `fetcher` provides mutation capabilities without navigation; if no
    `action` value on the form is specified, it will go to the `action`
    function of the route where it is rendered
  */

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
};
