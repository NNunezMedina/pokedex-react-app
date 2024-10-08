import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types"; 
import { Suspense, lazy } from "react";
import Pokedex from "./Pokedex";
import Favorites from "./Favorites/PokemonFavorites";
import ZodiacGame from "./Minigame/ZodiacGame";
import Lottie from "lottie-react";
import LoadingSpinner from "../assets/LoadingSpinner.json"

const Home = lazy(() => import("./Home"));

const Authenticated = ({ user }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Lottie animationData={LoadingSpinner} loop style={{ height: 150, width: 150 }} />
              </div>
            }
          >
            <Home user={user} />
          </Suspense>
        }
      />
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