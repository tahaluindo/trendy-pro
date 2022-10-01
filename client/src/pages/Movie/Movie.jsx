import React, { Fragment, useEffect, useState } from "react";
import style from "./movie.module.scss";
import interest from "./assets/interest.png";
import api from "../../services/api";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    api.get("/anime/127230").then((response) => setMovie(response.data.data.Media), console.log(movie)).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
    // api.get("/tvcredit/76479").then((response) => { setActors(response.data), console.log(response.data) }).catch((err) => {
    //   console.error("ops! ocorreu um erro" + err);
    // });
    // api.get("/tvkeywords/76479").then((response) => { response.data.results ? setKeywords(response.data.results) : setKeywords(response.data.keywords), console.log(response.data.keywords) }).catch((err) => {
    //   console.error("ops! ocorreu um erro" + err);
    // });
  }, []);

  return (
    <div className="page">
      <div className={style.container} style={
        movie.backdrop_path 
          ? { backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}
          : { backgroundImage: `url(${movie.bannerImage})`  }
        }>
        <div className={style.column}>
          <div className={style.cardinfo}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : movie.coverImage.extraLarge }
              alt=""
            />
            <div className={style.information}>
              <h6>Original Language</h6>
              <p>{movie.original_language}</p>

              {movie.budget ? 
              <>
                <h6>Budget</h6>
                <p>{movie.budget}</p> 
                <h6>Revenue</h6>
                <p>${movie.revenue}</p>
              </> : null}

              <h6>Keywords</h6>
              {
                movie.tags 
                ? movie.tags.map((item, index) => (
                    <button key={index}>{item.name}</button>
                  ))
                : keywords
                ? keywords.map((item, index)=>(
                    <button key={index}>{item.name}</button>
                  ))
                : null
              }
            </div>
          </div>
          <div className={style.movieinfo}>

            {/* <h2>{movie.title ? movie.title : movie.name} <span className={style.year}>({movie.release_date ? movie.release_date.substr(0, 4) : movie.first_air_date.substr(0, 4)})</span></h2> */}
            <h2>{movie.title.romaji ? movie.title.romaji : movie.title ? movie.title : movie.name} <span className={style.year}>()</span></h2>
            <p>
              {
                movie.genres.name
                ? movie.genres.map(genre => <span>{genre.name+" "}</span>)
                : movie.genres.map(genre => <span>{genre + ", "}</span>)
              }
              | 
              {
              movie.runtime ? movie.runtime + "Minutes" : movie.number_of_seasons + " Seasons " +  movie.number_of_episodes+ " Episodes"
              }
            </p>

            <p>{movie.overview ? movie.overview : movie.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>

            <h5>Cast</h5>
            <div className={style.people}>
              
              {/* {actors.cast.map(item => (
                <div className={style.peoplecard}>
                  <img className={style.peoplecardimg} src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} alt="" />
                  <h6>{item.character}</h6>
                  <p>{item.original_name}</p>
                </div>
                ))} */}
              
            </div>

            <h5>Related Queries</h5>
            <div className={style.keywords}>
              <button>fesdfdsfg</button>
              <button>fesdfdsfg</button>
              <button>fesdfdsfg</button>
            </div>

            <h5>Topics</h5>
            <div className={style.keywords}>
              <button>fesdfdsfg</button>
              <button>fesdfdsfg</button>
              <button>fesdfdsfg</button>
              <button>fesdfdsfg</button>
            </div>

            <h5>Interest Over Time</h5>
            <div className={style.interest}>
              <img src={interest} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
