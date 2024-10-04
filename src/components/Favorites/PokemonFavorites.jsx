import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth-Context";
import Lottie from "lottie-react";
import LoadingSpinner from "../../assets/LoadingSpinner.json";
import typeColors from "../../services/colorPokeCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user || !user.token) {
          setLoading(false);
          return;
        }

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
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (pokemonId) => {
    try {
      const favoriteToRemove = favorites.find(
        (pokemon) => pokemon.pokemon_id === pokemonId
      );

      if (!favoriteToRemove) {
        console.error("El Pokémon no se encuentra en la lista de favoritos.");
        return;
      }

      const favoriteId = favoriteToRemove.id;

      const response = await fetch(
        `https://poke-collection-api-production.up.railway.app/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      setFavorites(favorites.filter((pokemon) => pokemon.id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Lottie
          animationData={LoadingSpinner}
          loop
          style={{ height: 150, width: 150 }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Pokémons!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.pokemon_id}
            className="flex flex-row items-center rounded-lg shadow-lg p-4"
            style={{
              backgroundColor: typeColors[pokemon.pokemon_type] || "#fff",
              height: "150px",
              width: "250px",
            }}
          >
            <div className="flex flex-col justify-start text-white w-2/3">
              <Heart
                onClick={() => removeFavorite(pokemon.pokemon_id)}
                className="text-white text-opacity-90 cursor-pointer"
                style={{ fill: "white" }}
              />
              <h2 className="text-xl font-bold mb-2">{pokemon.pokemon_name}</h2>
              <p className="capitalize">{pokemon.pokemon_type}</p>
            </div>
            <img
              src={pokemon.pokemon_avatar_url}
              alt={pokemon.pokemon_name}
              className="h-32 ml-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
