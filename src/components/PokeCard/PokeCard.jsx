import { Heart } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import {
  fetchEvolutionChain,
  fetchMoveDetails,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "../../services/api-pokemon-fetch";
import Lottie from "lottie-react";
import LoadingSpinner from "../../assets/LoadingSpinner.json";
import { useAuth } from "../../context/Auth-Context";
import { addFavorite } from "../Favorites/AddFavorites";
const AboutSection = lazy(() => import("./AboutSection"));
const BaseStatsSection = lazy(() => import("./BaseStatSection"));
const EvolutionSection = lazy(() => import("./EvolutionSection"));
const MovesSection = lazy(() => import("./MovesSectios"));

const PokeCard = ({ pokemon }) => {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(1);
  const [loading, setLoading] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [evolutionImages, setEvolutionImages] = useState({});
  const [moveDetails, setMoveDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!pokemon) return null;

  const updateToggle = (id) => {
    setToggle(id);
    setLoading(true);
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formattedId = pokemon.id.toString().padStart(3, "0");

  const handleFavorite = async () => {
    try {
      await addFavorite(pokemon, user.token);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

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

      // Verifica si el Pokémon actual está en la lista de favoritos
      const favoriteExists = data.some((fav) => {
        return Number(fav.pokemon_id) === pokemon.id;
      });
      

      setIsFavorite(favoriteExists);
      console.log("Favorite exists:", favoriteExists);
    } catch (error) {
      console.error("Error checking if favorite:", error);
    }
  };

  useEffect(() => {
    // Verifica si el Pokémon es favorito cuando el componente se monta
    checkIfFavorite();
    console.log(checkIfFavorite());
  }, [pokemon.id, user]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        setLoading(true);
        const speciesData = await fetchPokemonSpecies(pokemon.id);
        const evolutionData = await fetchEvolutionChain(
          speciesData.evolution_chain.url
        );

        const chain = [];
        let current = evolutionData.chain;

        do {
          chain.push(capitalizeFirstLetter(current.species.name));
          current = current.evolves_to[0];
        } while (current && current.hasOwnProperty("evolves_to"));

        setEvolutionChain(chain);

        const images = {};
        for (const speciesName of chain) {
          const speciesDetails = await fetchPokemonDetails(speciesName);
          images[speciesName] =
            speciesDetails.sprites.other["official-artwork"].front_default;
        }
        setEvolutionImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
        setLoading(false);
      }
    };

    if (toggle === 3) {
      fetchEvolutionData();
    }
  }, [toggle, pokemon.id]);

  useEffect(() => {
    const fetchMoveDetailsData = async () => {
      try {
        setLoading(true);
        const moveDetailsArray = await Promise.all(
          pokemon.moves.slice(0, 5).map(async (move) => {
            const moveData = await fetchMoveDetails(move.move.url);
            return {
              name: move.move.name,
              accuracy: moveData.accuracy,
            };
          })
        );
        setMoveDetails(moveDetailsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching move details:", error);
        setLoading(false);
      }
    };

    if (toggle === 4) {
      fetchMoveDetailsData();
    }
  }, [toggle, pokemon.moves]);

  useEffect(() => {
    if (toggle === 1 || toggle === 2) {
      setLoading(false);
    }
  }, [toggle]);

  return (
    <div className="relative flex-row mt-2 px-2 py-1 z-10">
      <div className="flex justify-around items-center">
        <h2 className="text-lg font-semibold text-white ml-1">
          {capitalizeFirstLetter(pokemon.name)}
        </h2>
        <p className="text-white font-semibold">#{formattedId}</p>
      </div>
      <div className="flex justify-around items-center">
        {pokemon.types.map((typeInfo, index) => (
          <span
            key={index}
            className="text-white bg-gray-100 bg-opacity-50 px-2 py-1 rounded-[15px] text-sm"
          >
            {capitalizeFirstLetter(typeInfo.type.name)}
          </span>
        ))}
        <Heart
          className={`text-white text-opacity-90 cursor-pointer ${
            isFavorite ? "fill-current text-red-500" : ""
          }`}
          onClick={handleFavorite}
        />
      </div>

      <div className="relative flex justify-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 h-48 md:w-40 md:h-40 mt-2 z-10"
        />
      </div>
      <div className="bg-white rounded-lg mt-2">
        <ul className="flex flex-row space-x-2">
          {["About", "Base Stats", "Evolution", "Moves"].map((label, index) => (
            <button
              key={index}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                toggle === index + 1 ? "text-gray-600" : "text-gray-400"
              }`}
              onClick={() => updateToggle(index + 1)}
            >
              {label}
              {toggle === index + 1 && (
                <div className="absolute w-[45px] h-[2px] bg-gray-500 mt-3"></div>
              )}
            </button>
          ))}
        </ul>
        <div className="flex ml-3 mt-6">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Lottie
                animationData={LoadingSpinner}
                loop
                style={{ height: 150, width: 150 }}
              />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full h-full">
                  <Lottie
                    animationData={LoadingSpinner}
                    loop
                    style={{ height: 150, width: 150 }}
                  />
                </div>
              }
            >
              {toggle === 1 && (
                <AboutSection toggle={toggle} pokemon={pokemon} />
              )}
              {toggle === 2 && <BaseStatsSection stats={pokemon.stats} />}
              {toggle === 3 && (
                <EvolutionSection
                  toggle={toggle}
                  evolutionChain={evolutionChain}
                  evolutionImages={evolutionImages}
                />
              )}
              {toggle === 4 && <MovesSection moveDetails={moveDetails} />}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};
export default PokeCard;
