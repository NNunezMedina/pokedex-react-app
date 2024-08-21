import { Heart } from "lucide-react";
import pokebolablanca from "../assets/pokebolasinfondo.png";
import { useState } from "react";

const PokeCard = ({ pokemon }) => {
  const [activeSection, setActiveSection] = useState("about");
  if (!pokemon) return null;

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formattedId = pokemon.id.toString().padStart(3, "0");

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="flex-row mt-2 px-2 py-1 ">
      <div className="flex justify-around items-center">
        <h2 className=" text-lg font-semibold text-white ml-1">
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
        <img
          src={pokebolablanca}
          alt="Icon"
          className="absolute left-20 h-50 w-50 z-0 "
        />
      </div>
      <div className=" bg-white rounded-lg mt-2">
        <header className="flex flex-row space-x-2">
          <button
            onClick={() => handleSectionClick("about")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === "about" ? "text-black" : "text-gray-400"
            }`}
          >
            About
          </button>

          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Base Stats
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Evolution
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Moves
          </a>
        </header>
        <div className=" flex mt-2 ml-3">
          {activeSection === "about" && (
            <ul className="mb-2">
              <li className="text-sm font-medium mb-2">
                <span className="text-gray-400 mr-8">Height:</span>
                <span className="text-gray-600">{pokemon.height * 10} cm</span>
              </li>
              <li className="text-sm font-medium mb-2">
                <span className="text-gray-400 mr-7">Weight:</span>
                <span className="text-gray-600">{pokemon.weight * 1} kg</span>
              </li>
              <li className="text-sm font-medium">
                <span className="text-gray-400 mr-6">Abilities:</span>
                <span>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="text-gray-600 mr-2">
                      {capitalizeFirstLetter(ability.ability.name)}
                    </span>
                  ))}
                </span>
              </li>
              <div className="text-sm font-medium text-black mt-4 mb-4">
                Types
              </div>
              <li className="text-sm font-medium">
                <span className="text-gray-400 mr-6">Abilities:</span>
                <span>
                  {pokemon.types.map((type, index) => (
                    <span key={index} className="text-gray-600 mr-2">
                      {capitalizeFirstLetter(type.type.name)}
                    </span>
                  ))}
                </span>
              </li>

            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
