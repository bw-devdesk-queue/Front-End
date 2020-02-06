import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [search, setSearch] = useState("");
  // const [searchData, setSearchData] = useState([]);

  const searchChange = e => {
    e.preventDefault();
    setSearch(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <section className="search-form">
      <h1>Seach Here...</h1>
      <input
        type="text"
        placeholder="Search Tickets and more... "
        onChange={searchChange}
        value={search}
      />
      <button>Search</button>
    </section>
  );
}
