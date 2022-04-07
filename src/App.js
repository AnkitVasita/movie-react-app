import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import PopularPage from "./pages/PopularPage";
import TrendingPage from "./pages/TrendingPage";
import TvShowsPage from "./pages/TvShowsPage";
import TopRatedPage from "./pages/TopRatedPage";
import MovieDetail from "./components/MovieDetail";
import ShowDetail from "./components/ShowDetail";
import SearchData from "./components/SearchData";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/popular">
            <PopularPage />
          </Route>
          <Route path="/trending">
            <TrendingPage />
          </Route>
          <Route path="/toprated">
            <TopRatedPage />
          </Route>
          <Route path="/tvshows">
            <TvShowsPage />
          </Route>
          <Route path="/moviedetail/:id">
            <MovieDetail />
          </Route>
          <Route path="/showdetail/:id">
            <ShowDetail />
          </Route>
          <Route path="/search">
            <SearchData />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
