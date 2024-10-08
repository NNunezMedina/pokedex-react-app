import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types"; 
import Home from "./Home";
import Pokedex from "./Pokedex";
import Favorites from "./Favorites/PokemonFavorites";
import ZodiacGame from "./Minigame/ZodiacGame";

const Authenticated = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} /> 
      <Route path="/pokedex" element={<Pokedex />} /> 
      <Route path="/favorites" element={<Favorites />} />
      <Route path = "/minigame" element={<ZodiacGame/>}/>
    </Routes>
  );
};

export default Authenticated;

Authenticated.propTypes = {
    user: PropTypes.object,
  };