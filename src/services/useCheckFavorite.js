import { useState, useEffect } from "react";

const useCheckFavorite = (pokemonId, user) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        if (!user || !user.token) return;

        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await fetch(
          "https://poke-collection-api-production.up.railway.app/favorites",
          options
        );

        if (!response.ok) throw new Error("Failed to fetch favorites");

        const data = await response.json();

        const favoriteExists = data.some((fav) => {
          return Number(fav.pokemon_id) === pokemonId;
        });

        setIsFavorite(favoriteExists);
      } catch (error) {
        console.error("Error checking if favorite:", error);
      }
    };

    if (pokemonId && user) {
      checkIfFavorite();
    }
  }, [pokemonId, user]);

  return isFavorite;
};

export default useCheckFavorite;