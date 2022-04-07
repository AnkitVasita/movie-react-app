import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncDiscover } from "../features/movie/movieSlice";
import DiscoverMovies from "./DiscoverMovies";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncDiscover());
  }, [dispatch]);

  return (
    <Container>
      <ImgSlider />
      <ViewerDiv>
        <Viewers />
      </ViewerDiv>
      <DiscoverMovies />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const ViewerDiv = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Home;
