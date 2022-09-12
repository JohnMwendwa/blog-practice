import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SearchForm = styled.form``;
const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  margin-right: -8px;
  background-color: white;
  font-size: 1rem;
`;

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
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search article..."
      />
    </SearchForm>
  );
}
