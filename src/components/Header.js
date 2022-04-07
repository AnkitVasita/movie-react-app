import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Nav>
      <Logo>
        <h1 style={{ width: "100%" }}>Movies Hub</h1>
      </Logo>

      <NavMenu>
        <Link to="/">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </Link>
        <Link to="/search">
          <img src="/images/search-icon.svg" alt="SEARCH" />
          <span>SEARCH</span>
        </Link>
        <Link to="/trending">
          <img src="/images/original-icon.svg" alt="ORIGINALS" />
          <span>TRENDING</span>
        </Link>
        <Link to="/popular">
          <img src="/images/movie-icon.svg" alt="MOVIES" />
          <span>POPULAR</span>
        </Link>
        <Link to="/toprated">
          <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
          <span>TOP RATED</span>
        </Link>
        <Link to="/tvshows">
          <img src="/images/series-icon.svg" alt="SERIES" />
          <span>TV SHOWS</span>
        </Link>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px 0 15px;
  /* letter-spacing: 16px; */
  z-index: 3;
`;

const Logo = styled.div`
  padding: 0;
  margin-top: 4px;

  @media (max-width: 768px) {
    /* padding-left: 15px; */
  }

  h1 {
    width: 100%;
    color: "red";
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  margin-left: 25px;
  position: relative;
  margin-right: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 10px;
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
      @media (max-width: 768px) {
        display: none;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

export default Header;
