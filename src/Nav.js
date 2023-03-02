import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  const { pathname } = useLocation();

  return (
    <nav className="Nav">
      <form
        action=""
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search">Search Post</label>
        <input
          type="text"
          id="search"
          value={search}
          placeholder="Search Post"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <nav>
        <ul>
          <li>
            <Link to="/" className={pathname === "/" ? "selected" : null}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="post"
              className={pathname === "/post" ? "selected" : null}
            >
              Post
            </Link>
          </li>
          <li>
            <Link
              to="about"
              className={pathname === "/about" ? "selected" : null}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Nav;
