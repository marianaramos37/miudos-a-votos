
import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'

const SearchbarDropdown = (props) => {
  const { options, onInputChange, isDisabled } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  var color = "white"
  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);
  document.addEventListener('change', (event) => {
    if(isDisabled){
      document.getElementById("search-bar").placeholder = "Pesquisa o nome do livro aqui"
      document.getElementById("search-bar").value = ""
    }
  })
  return (
    <div className="search-bar-dropdown">
      <div className="text-start d-flex align-items-center">
        <div  className="text-start d-flex align-items-center" 
        style={{height:'38px', borderTop: "0.1px solid", borderLeft: '0.1px solid', borderBottom: '0.1px solid', borderRadius: '5px 0px 0px 5px', color: "#d1cdcd"}} >
        <FontAwesomeIcon style={{ color: "#bcbcbc" }} className="p-2" icon={faMagnifyingGlass} />
        </div>
      
      <input
        style={{ borderLeft: "0px", borderRadius: '0px 5px 5px 0px'}}
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Pesquisa o nome do livro aqui"
        ref={inputRef}
        onChange={onInputChange}
        required
        disabled={isDisabled}
      />
      </div>
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchbarDropdown;