import React, { useState, useEffect } from "react";

export default function Search({ searchTerm }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    searchTerm(searchQuery);
  }, [searchQuery, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchTerm(searchQuery);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search article..."
      />
    </form>
  );
}
