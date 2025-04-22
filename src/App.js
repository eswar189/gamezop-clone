import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function GamezopClone() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pub.gamezop.com/v3/games?id=Pcvrm3KNJ")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games || []);
        setLoading(false);
      });
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gamezop Clone</h1>
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Loading games...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.code}
              className="hover:shadow-lg transition border rounded-md overflow-hidden"
            >
              <Link
                to={`/play?url=${encodeURIComponent(
                  game.url
                )}&title=${encodeURIComponent(game.name.en)}`}
              >
                <div className="p-2">
                  <img
                    src={game.assets.cover}
                    alt={game.name.en}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h2 className="text-sm font-medium text-center truncate">
                    {game.name.en}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GamePlayer() {
  const query = new URLSearchParams(window.location.search);
  const gameUrl = query.get("url");
  const gameTitle = query.get("name");
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{gameTitle}</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>

      <div className="flex gap-4">
        {/* Left Ad */}
        <div className="hidden lg:block w-1/6 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
            data-ad-slot="1111111111"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="flex-1">
          <iframe
            src={gameUrl}
            title={gameTitle}
            width="100%"
            height="600"
            className="rounded-xl border shadow"
            allowFullScreen
          />

          {/* Bottom Ad */}
          <div className="my-4 text-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-9480366884412883"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block w-1/6 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9480366884412883"
            data-ad-slot="2222222222"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamezopClone />} />
        <Route path="/play" element={<GamePlayer />} />
      </Routes>
    </Router>
  );
}
