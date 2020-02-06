import SearchForm from "./SearchForm.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchInfo = ["me", "you", "people", "dark", "poop", "games", "gums"];

const DataList = props => {
  // TODO: Add useState to track data from useEffect
  const [Data, setData] = useState([]);

  useEffect(() => {
  
    const getData = () => {
     
  const onSearch = query => {
    

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div className="data-list">
      </div>
    </div>
  );
};


export default CharacterList;
