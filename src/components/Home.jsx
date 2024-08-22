import { Link } from "react-router-dom";
import pokemonTitle from "../assets/pokemonTitle.png";
import { useAuth } from "../context/Auth-Context";
import pokebola from "../assets/pokebola.png";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl font-bold text-center">
          Welcome back! {user.email}
          <br />
          What do you want to do today?
        </h1>
        <div className="flex justify-center">
          <img src={pokemonTitle} alt="Pokemon title" className="m-8" />
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/pokedex-react-app/home/pokedex"
            className="relative flex items-center justify-between rounded-3xl bg-[#e8656c] w-64 py-4 text-lg font-medium text-white ring-1 ring-inset ring-gray-500/10 mb-7 overflow-hidden"
          >
            <img
              src={pokebola}
              alt="Icon"
              className="absolute right-0 h-20 w-20 mr-1"
            />
            <span className="pl-16 text-center">Pokedex</span>
          </Link>
          <Link className="relative flex items-center justify-between rounded-3xl bg-[#f9ce51] w-64 py-4 text-lg font-medium text-white ring-1 ring-inset ring-gray-500/10 mb-7 overflow-hidden">
            <img
              src={pokebola}
              alt="Icon"
              className="absolute right-0 h-20 w-20 mr-1"
            />
            <span className="pl-16 text-center">Favorites</span>
          </Link>

          <Link className="relative flex items-center justify-between rounded-3xl bg-[#57cba4] w-64 py-4 text-lg font-medium text-white ring-1 ring-inset ring-gray-500/10 mb-5 overflow-hidden">
            <img
              src={pokebola}
              alt="Icon"
              className="absolute right-0 h-20 w-20 mr-1"
            />
            <span className="pl-16 text-center">Minigame</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Link
          to="/pokedex-react-app/"
          className=" p-[10px] font-bold text-violet-600"
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Home;
