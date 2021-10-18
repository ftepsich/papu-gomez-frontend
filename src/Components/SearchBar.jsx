import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log("Busqueda: " + event.target.value);
  };
  return (
    <input
      type="text"
      value={search}
      placeholder="Buscar"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
