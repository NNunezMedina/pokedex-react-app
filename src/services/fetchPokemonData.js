const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export function fetchPokemonData(pokemonData) {
  return fetch(`${BASE_URL}/${pokemonData}`).then((response) =>
    response.json()
  );
}
