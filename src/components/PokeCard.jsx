import { Heart } from "lucide-react";

import { useState } from "react";

const PokeCard = ({ pokemon }) => {
  const [toggle, setToggle] = useState(1);
  if (!pokemon) return null;

  function updateToggle(id) {
    setToggle(id);
  }

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formattedId = pokemon.id.toString().padStart(3, "0");

  const getAbbreviatedStatName = (name) => {
    const statMap = {
      "special-attack": "Sp. Att",
      "special-defense": "Sp. Def",
    };
    return statMap[name] || capitalizeFirstLetter(name);
  };

  return (
    <div className="relative flex-row mt-2 px-2 py-1 z-10">
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
      </div>
      <div className=" bg-white rounded-lg mt-2">
        <ul className="flex flex-row space-x-2">
          <li
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-400"
            onClick={() => updateToggle(1)}
          >
            About
          </li>
          <li
            className="rounded-md px-3 py-2 text-sm font-medium  text-gray-400"
            onClick={() => updateToggle(2)}
          >
            Base Stats
          </li>
          <li
            className="rounded-md px-3 py-2 text-sm font-medium  text-gray-400"
            onClick={() => updateToggle(3)}
          >
            Evolution
          </li>
          <li
            className="rounded-md px-3 py-2 text-sm font-medium  text-gray-400"
            onClick={() => updateToggle(4)}
          >
            Moves
          </li>
        </ul>
        <hr/>
        <div className=" flex mt-2 ml-3">
          {toggle === 1 && (
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
         {toggle === 2 && (
  <ul className="mb-2">
    {pokemon.stats.map((stat, index) => (
      <li
        key={index}
        className="text-sm font-medium mb-2 flex items-center"
      >
        <span className="text-gray-400 flex-1 mb-1">
          {getAbbreviatedStatName(stat.stat.name)}:
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 ml-4">{stat.base_stat}</span>
          <div className="relative w-[200px] h-[3px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
            />
          </div>
        </div>
      </li>
    ))}
  </ul>
)}
          {toggle === 3 && <ul>Evolution</ul>}
          {toggle === 4 && <ul>Moves</ul>}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
