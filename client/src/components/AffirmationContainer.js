import { useEffect, useState } from "react";
import AffirmationCard from "./AffirmationCard";
import FavoritesCard from "./FavoritesCard";
import { filter } from "@chakra-ui/react";

function Affirmation({ affirmation, setAffirmation, favorites, setFavorites, userId }) {

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => { 
    const favfilter = favorites.filter(favorite => favorite.affirmation_id === affirmation.id)
    
   favfilter.length > 0 ? setIsFavorited(favfilter[0].id) : setIsFavorited(false)
  })
  console.log(favorites, 'favorites')
  //useEffect and filter through favorites and see if the affirmation id is in the favorites array and if it is set isFavorited to true

  const favoritesCard = isFavorited && <FavoritesCard isFavorited={isFavorited} setIsFavorited={setIsFavorited} key={isFavorited} favorite_id = {isFavorited} setFavorites={setFavorites} userId ={userId} quote={affirmation.quote}/>

  return (
    <main>
    <AffirmationCard isFavorited={isFavorited} setIsFavorited={setIsFavorited} key={affirmation.id} id={affirmation.id} quote={affirmation.quote} like_count={affirmation.like_count} setAffirmation={setAffirmation} favorites={favorites} setFavorites={setFavorites} userId={userId} />
    {favoritesCard}
    </main>
  );
}

 

export default Affirmation;