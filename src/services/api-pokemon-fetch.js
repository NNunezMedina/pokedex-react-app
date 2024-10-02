const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonSpecies = async (id) => {
  const response = await fetch(`${API_BASE_URL}/pokemon-species/${id}/`);
  if (!response.ok) throw new Error("Failed to fetch species data");
  return response.json();
};

export const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch evolution chain");
  return response.json();
};

export const fetchPokemonDetails = async (name) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error("Failed to fetch Pokémon details");
  return response.json();
};

export const fetchMoveDetails = async (moveUrl) => {
  const response = await fetch(moveUrl);
  if (!response.ok) throw new Error("Failed to fetch move details");
  return response.json();
};
