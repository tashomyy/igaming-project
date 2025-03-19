import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useState } from "react";
import { Game } from "../lib/types";
import { fetchGames } from "../services/games";

const Homepage = () => {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    const fetchGamesData = async () => {
      const res = await fetchGames();
      console.log(res);
    };
    fetchGamesData();
  }, []);

  const centerClassNameTemp =
    "flex items-center justify-center mx-auto text-center my-5";
  return (
    <>
      <h1 className="my-5 mx-2 text-center pt-12 primary-heading">
        Welcome to the iGaming project app
      </h1>
      <p className="text-center primary-body">
        Testing fetch data and error handling
      </p>
      <img
        src="/monkey-link.svg"
        alt="Monkey logo"
        className="w-4/12 mx-auto mt-5"
      />
      <ErrorBoundary
        fallback={
          <div className={centerClassNameTemp}>
            Something went wrong with loading games
          </div>
        }
      >
        <Suspense
          fallback={<div className={centerClassNameTemp}>Loading games...</div>}
        ></Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Homepage;
