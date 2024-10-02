const AboutSection = ({ toggle, pokemon }) => {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    return (
      <>
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
    <li className="text-sm font-medium mb-2">
      <span className="text-gray-400 mr-6">Abilities:</span>
      <span>
        {pokemon.abilities.map((ability, index) => (
          <span key={index} className="text-gray-600 mr-2">
            {capitalizeFirstLetter(ability.ability.name)}
          </span>
        ))}
      </span>
    </li>
    <div className="text-sm font-medium text-black mt-4 mb-4">Types</div>
    <li className="text-sm font-medium">
      <span className="text-gray-400 mr-6">Types:</span>
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
      </>
    );
  };
  
  export default AboutSection;