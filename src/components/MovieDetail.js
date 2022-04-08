import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./Detail.css";

import {
  fetchAsyncDetails,
  removeSelectedMovie,
  selectSingleDetail,
} from "../features/movie/movieSlice";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

const MovieDetail = () => {
  const [video, setVideo] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailData = useSelector(selectSingleDetail);
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
  const img_300 = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    async function fetchVideo() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    }
    fetchVideo();
  }, [id]);

  useEffect(() => {
    dispatch(fetchAsyncDetails(id));
    return () => {
      dispatch(removeSelectedMovie());
    };
  }, [dispatch, id]);

  return (
    <div className="details">
      {Object.keys(detailData).length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <img
            src={`${img_300}${
              detailData.poster_path || detailData.backdrop_path || unavailable
            }`}
            alt={detailData.title}
          />
          <div className="details-left">
            <h2>{detailData.title}</h2>
            <p>{detailData.overview}</p>
            <p>
              <span>Rating</span> {detailData.vote_average}
            </p>
            <p>
              {" "}
              <span>Released</span> {detailData.release_date}
            </p>
            <p>
              <span>Populaity</span> {detailData.popularity}
            </p>
            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              color="secondary"
              target="__blank"
              href={`https://www.youtube.com/watch?v=${video}`}
            >
              Watch the Trailer
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
