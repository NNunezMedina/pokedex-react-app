import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth-Context";
import Lottie from "lottie-react";
import LoadingSpinner from "../../assets/LoadingSpinner.json";
import typeColors from "../../services/colorPokeCard";
import { Heart,MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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

        const favoritesData = await response.json();
        
        const favoritesWithDetails = await Promise.all(
          favoritesData.map(async (pokemon) => {
            const pokeApiResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_name.toLowerCase()}`
            );
            const pokeApiData = await pokeApiResponse.json();
            return {
              ...pokemon, 
              types: pokeApiData.types, 
              stats: pokeApiData.stats, // Añadir stats para detalles
              height: pokeApiData.height,
              weight: pokeApiData.weight
            };
          })
        );

        setFavorites(favoritesWithDetails);
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

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon); // Establecer el Pokémon seleccionado
    setIsModalOpen(true); // Mostrar el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setSelectedPokemon(null); // Limpiar Pokémon seleccionado
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
       <div className="flex items-center justify-between mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to="/pokedex-react-app/home">
          <MoveLeft className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-3" />
        </Link>
      <h1 className="text-2xl font-bold mb-4">Your Favorite Pokémons!</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.pokemon_id}
            className="flex flex-row items-center rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.2)] p-4 transition-transform transform hover:translate-y-[-5px] hover:translate-x-[5px]"
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
              <div>
                {pokemon.types.map((typeObj, index) => (
                  <span key={index} className="capitalize mb-2 inline-block bg-gray-100 bg-opacity-50 px-2 py-1 rounded-[15px]">
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>
            <img
              src={pokemon.pokemon_avatar_url}
              alt={pokemon.pokemon_name}
              className="h-32 ml-auto cursor-pointer"
              onClick={() => openModal(pokemon)}
            />
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPokemon && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {selectedPokemon.pokemon_name}
            </h2>
            <img
              src={selectedPokemon.pokemon_avatar_url}
              alt={selectedPokemon.pokemon_name}
              className="mx-auto mb-4 h-48"
            />
            <p><strong>Height:</strong> {selectedPokemon.height} decimetres</p>
            <p><strong>Weight:</strong> {selectedPokemon.weight} hectograms</p>
            <div>
              <h3 className="font-bold mt-4">Types:</h3>
              {selectedPokemon.types.map((typeObj, index) => (
                <span key={index} className="capitalize inline-block bg-gray-100 bg-opacity-50 px-2 py-1 rounded-[15px] m-1">
                  {typeObj.type.name}
                </span>
              ))}
            </div>
            <div>
              <h3 className="font-bold mt-4">Stats:</h3>
              {selectedPokemon.stats.map((stat, index) => (
                <p key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Favorites;
