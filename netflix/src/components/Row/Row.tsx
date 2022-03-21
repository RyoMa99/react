import React, { useEffect, useState } from "react";
import instance from "../../api/api";
import "./Row.scss";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

const Row: React.VFC<Props> = ({title, fetchUrl, isLargeRow}) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      const req = await instance.get(fetchUrl);
      setMovies(req.data.results);
    })();
  },[fetchUrl]);

  console.log(movies);

  return(
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {
          movies.map((movie) => {
            return(
              <img
                key={movie.id}
                className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                src={`https://image.tmdb.org/t/p/original${ isLargeRow 
                  ? movie.poster_path
                  : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            );
          })
        }
      </div>
    </div>
  );
} 

export default Row;