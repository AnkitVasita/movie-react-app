import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncTopRated,
  selectTopRated,
} from "../features/movie/movieSlice";
import { useEffect } from "react";
import { useState } from "react";
import CustomPagination from "../Pagination/CustomPagination";

const TopRated = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const movies = useSelector(selectTopRated);
  const unavailableLandscape =
    "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";
  const img_300 = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    dispatch(fetchAsyncTopRated(page));
  }, [dispatch, page]);

  return (
    <Container>
      <h2>TopRated</h2>
      <Content>
        {movies &&
          movies.map((movie, key) => (
            <>
              <Wrapper>
                <Wrap key={key}>
                  <Link to={`/moviedetail/` + movie.id}>
                    <img
                      src={`${img_300}${
                        movie.backdrop_path ||
                        movie.poster_path ||
                        unavailableLandscape
                      }`}
                      alt={movie.title}
                    />
                  </Link>
                </Wrap>

                <h3>{movie.title || movie.name}</h3>
              </Wrapper>
            </>
          ))}
      </Content>
      <CustomPagination setPage={setPage} />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default TopRated;
