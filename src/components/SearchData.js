import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomPagination from "../Pagination/CustomPagination";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const SearchData = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [page, setPage] = useState(1);
  const img_300 = "https://image.tmdb.org/t/p/w300";

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setMovies(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  console.log("got it", movies);

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <TextField
          style={{ flex: 2, width: 250 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon fontSize="large" />
        </Button>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 20 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <Content>
        {movies &&
          movies.map((movie, key) => (
            <>
              <Wrapper>
                <Wrap key={key}>
                  {movie.id}
                  <Link
                    to={
                      type === 0
                        ? `/moviedetail/` + movie.id
                        : `/showdetail/` + movie.id
                    }
                  >
                    <img
                      src={`${img_300}${
                        movie.backdrop_path || movie.poster_path
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
      {searchText &&
        !movies &&
        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 50px 0 50px;
  margin-top: 90px;

  @media (max-width: 768px) {
    padding: 0 20px 0 20px;
  }
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

export default SearchData;
