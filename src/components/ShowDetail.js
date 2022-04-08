import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Detail.css";
import YouTubeIcon from "@material-ui/icons/YouTube";

import {
  fetchAsyncShowsDetails,
  removeSelectedShow,
  selectShowDetails,
} from "../features/movie/movieSlice";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

const ShowDetail = () => {
  const [video, setVideo] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailData = useSelector(selectShowDetails);
  const img_300 = "https://image.tmdb.org/t/p/w300";
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

  useEffect(() => {
    async function fetchVideo() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    }
    fetchVideo();
  }, [id]);

  useEffect(() => {
    dispatch(fetchAsyncShowsDetails(id));

    return () => {
      dispatch(removeSelectedShow());
    };
  }, [dispatch, id]);

  return (
    <div className="details">
      <img
        src={`${img_300}${detailData.poster_path || detailData.backdrop_path}`}
        alt={detailData.name || detailData.original_name || unavailable}
      />
      <div className="details-left">
        <h2>{detailData.title}</h2>
        <p>{detailData.overview}</p>
        <p>
          <span>Rating</span> {detailData.vote_average}
        </p>
        <p>
          {" "}
          <span>Released</span> {detailData.first_air_date}
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
    </div>
  );
};

export default ShowDetail;
