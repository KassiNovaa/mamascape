import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"; 
import AffirmationCard from "./AffirmationCard";
import FavoritesCard from "./FavoritesCard";


function Affirmation({ affirmation, setAffirmation, favorites, setFavorites, userId }) {

  const { isFavorited, setIsFavorited } = useOutletContext();
  

  useEffect(() => { 
    const favfilter = favorites.filter(favorite => favorite.affirmation_id === affirmation.id)
    
   favfilter.length > 0 ? setIsFavorited(favfilter[0].id) : setIsFavorited(false)
  })
  // console.log(favorites, 'favorites')

  const favoritesCard = isFavorited && <FavoritesCard isFavorited={isFavorited} setIsFavorited={setIsFavorited} key={isFavorited} favorite_id = {isFavorited} setFavorites={setFavorites} userId ={userId} quote={affirmation.quote}/>

  return (
    <main>
    <AffirmationCard isFavorited={isFavorited} setIsFavorited={setIsFavorited} key={affirmation.id} id={affirmation.id} quote={affirmation.quote} like_count={affirmation.like_count} setAffirmation={setAffirmation} favorites={favorites} setFavorites={setFavorites} userId={userId} />
    {favoritesCard}
    </main>
  );
}

 

export default Affirmation;