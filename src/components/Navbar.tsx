import { useRef } from "react";

import { Movie } from "../types/movies.tsx";
import Logo from "./Logo.tsx";
import { useKeyPress } from "../hooks/useKeyPress.tsx";

type NavbarProps = {
  movies: Movie[];
  query: string;
  setQuery: (query: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ movies, query, setQuery }) => {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useKeyPress("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    if (inputEl.current) {
      inputEl.current.focus();
      setQuery("");
    }
  });

  return (
    <nav className="nav-bar">
      <Logo />
      <input
        name="search"
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default Navbar;
