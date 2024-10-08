import { useState } from 'react';
import { getPokemonByZodiacSign, getZodiacSign } from '../../utils/zodiacUtils';

const ZodiacGame = () => {
  const [date, setDate] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [_year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setError('Fecha no válida');
      return;
    }

    const sign = getZodiacSign(day, month);
    const pokemonId = getPokemonByZodiacSign(sign);
    const pokemonData = await getPokemonData(pokemonId);
    
    setPokemon(pokemonData);
    setError('');
  };

  const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Discover your pokemon from your zodiac sign!</h1>
      <form 
      onSubmit={handleSubmit}>
        <input
        className="bg-gray-900 rounded-[10px] focus:outline-none text-sm space-y-6 bg-opacity-5"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Discover!</button>
      </form>
      {error && <p>{error}</p>}
      {pokemon && (
        <div>
          <h2 className="text-xl font-bold mb-2">Your Pokemon is: {pokemon.name}</h2>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-48 h-48" />
        </div>
      )}
    </div>
  );
};

export default ZodiacGame;