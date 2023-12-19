import { OrderedList, ListItem } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom";
import FavoriteListCard from './FavoriteListCard'

function FavoriteList({}) {
  const { favorites } = useOutletContext();
  console.log(favorites, 'hi favorites passed in the favorlist here'); // Check the value of favorites

  const favoritesList = favorites.map(favorite => (
    <FavoriteListCard key={favorite.id} favorite={favorite} quote={favorite.affirmation.quote} />
  ));
  return (
    <div>
      <h1>Favorites</h1>
      <div>
          {favoritesList}
      </div>
    </div>
  );
}

export default FavoriteList;
