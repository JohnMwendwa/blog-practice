import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../../contexts/searchContext";

const SearchForm = styled.form``;
const SearchInput = styled.input`
  outline: none;
  border: none;
  padding: 5px 10px;
  margin-right: -8px;
  background-color: white;

  @media (min-width: 600px) {
    font-size: 1rem;
  }
`;

export default function Search() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm, setSearchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search article..."
      />
    </SearchForm>
  );
}
