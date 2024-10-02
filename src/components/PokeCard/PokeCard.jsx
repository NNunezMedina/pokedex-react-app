import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import AboutSection from "./AboutSection";
import EvolutionSection from "./EvolutionSection";
import BaseStatsSection from "./BaseStatSection";
import MovesSection from "./MovesSectios";
import { fetchEvolutionChain, fetchMoveDetails, fetchPokemonDetails, fetchPokemonSpecies } from "../../services/api-pokemon-fetch";

const PokeCard = ({ pokemon }) => {
  const [toggle, setToggle] = useState(1);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [evolutionImages, setEvolutionImages] = useState({});
  const [moveDetails, setMoveDetails] = useState([]);

  if (!pokemon) return null;

  const updateToggle = (id) => {
    setToggle(id);
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formattedId = pokemon.id.toString().padStart(3, "0");

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const speciesData = await fetchPokemonSpecies(pokemon.id);
        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
        
        const chain = [];
        let current = evolutionData.chain;

        do {
          chain.push(capitalizeFirstLetter(current.species.name));
          current = current.evolves_to[0];
        } while (current && current.hasOwnProperty("evolves_to"));

        setEvolutionChain(chain);

        // Fetch images for each Pokémon in the evolution chain
        const images = {};
        for (const speciesName of chain) {
          const speciesDetails = await fetchPokemonDetails(speciesName);
          images[speciesName] =
            speciesDetails.sprites.other["official-artwork"].front_default;
        }
        setEvolutionImages(images);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    if (toggle === 3) {
      fetchEvolutionData();
    }
  }, [toggle, pokemon.id]);
  
  useEffect(() => {
    const fetchMoveDetailsData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching move details:", error);
      }
    };

    if (toggle === 4) {
      fetchMoveDetailsData();
    }
  }, [toggle, pokemon.moves]);

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
        <Heart className="text-white text-opacity-90" />
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
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              toggle === 1 ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => updateToggle(1)}
          >
            About
            {toggle === 1 && (
              <div className="absolute w-[45px] h-[2px] bg-gray-500 mt-3"></div>
            )}
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              toggle === 2 ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => updateToggle(2)}
          >
            Base Stats
            {toggle === 2 && (
              <div className="absolute w-[75px] h-[2px] bg-gray-500 mt-3"></div>
            )}
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              toggle === 3 ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => updateToggle(3)}
          >
            Evolution
            {toggle === 3 && (
              <div className="absolute w-[68px] h-[2px] bg-gray-500 mt-3"></div>
            )}
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              toggle === 4 ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => updateToggle(4)}
          >
            Moves
            {toggle === 4 && (
              <div className="absolute w-[49px] h-[2px] bg-gray-500 mt-3"></div>
            )}
          </button>
        </ul>
        <div className="flex ml-3 mt-6">
          {toggle === 1 && <AboutSection toggle={toggle} pokemon={pokemon} />}
          {toggle === 2 && <BaseStatsSection stats={pokemon.stats} />}
          {toggle === 3 && (
            <EvolutionSection
              toggle={toggle}
              evolutionChain={evolutionChain}
              evolutionImages={evolutionImages}
            />
          )}
          {toggle === 4 && (
            <MovesSection moveDetails={moveDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
