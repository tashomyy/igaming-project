import React from "react";
import { Game } from "../../lib/types";

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3  gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={game.desktopThumbnail.url}
              alt={game.name}
              className="w-full h-80 object-cover transition-transform duration-300 transform group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white font-semibold text-lg">{game.name}</h3>
              <p className="text-gray-300 text-sm">{game.provider}</p>
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && (
        <p className="text-center text-gray-400 mt-5">No games found</p>
      )}
    </div>
  );
};

export default GameGrid;
