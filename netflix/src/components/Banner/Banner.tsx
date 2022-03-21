import React, { useEffect, useState } from "react";
import instance from "../../api/api";
import { request } from "../../api/request";
import "./Banner.scss";

type movieProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

const Banner: React.VFC = () => {
  const [movie, setMovie] = useState<movieProps>({});

  useEffect(() => {
    (async () => {
      const req = await instance.get(request.fetchNetflixOriginals);
      setMovie(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
    })();
  },[]);

  const truncate = (str: any, n: number) => {
    if(str) return str.length > n ? str.substr(0, n-1) + "..." : str;
  }

  return(
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
};

export default Banner;