import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import instance from "../../api/api";
import { request } from "../../api/request";
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

type Option = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

type RowState = {
  movies: Movie[];
  trailerUrl: string | null;
};

const Row: React.VFC<Props> = ({title, fetchUrl, isLargeRow}) => {
  const [state, setState] = useState<RowState>({
    movies: [],
    trailerUrl: "",
  });

  useEffect(() => {
    (async () => {
      const req = await instance.get(fetchUrl);
      setState((prev) => {
        return({
          ...prev,
          movies: req.data.results,
        });
      });
    })();
  },[fetchUrl]);

  const opts: Option = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    },
  }

  const handleClick = async (movie: Movie) => {
    if(state.trailerUrl){
      setState((prev) => {
        return({
          ...prev,
          trailerUrl: "",
        });
      });
    }else{
      const trilerUrl = await instance.get(request.fetchMovieTrailer(movie.id));
      setState((prev) => {
        return({
          ...prev,
          trailerUrl: trilerUrl.data.results[0]?.key
        });
      });
    }
  }

  return(
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {
          state.movies.map((movie) => {
            return(
              <img
                key={movie.id}
                className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                src={`https://image.tmdb.org/t/p/original${ isLargeRow 
                  ? movie.poster_path
                  : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            );
          })
        }
      </div>
      {state.trailerUrl && <YouTube videoId={state.trailerUrl} opts={opts} />}
    </div>
  );
} 

export default Row;