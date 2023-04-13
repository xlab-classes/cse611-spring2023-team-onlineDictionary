import { useState, useEffect, useRef } from "react";
import classes from "./Header.module.css";
import ubLogo from "../../assets/Icons/ub-logo.png";
import words  from "../../assets/wordList";

const Header = (props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [arrowKeyPressed, setArrowKeyPressed] = useState(false);

  useEffect(() => {
    if (searchResults.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchResults([]);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResults]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.wordHandle(event.target.elements.word.value);
    console.log(event.target.elements.word.value);
    setSearchResults([]);
    setActiveIndex(-1);
    setArrowKeyPressed(false);
    event.target.elements.word.blur();
  };

  const disableSearch = () => {
    props.wordDisable();
  };

  const onInputChangeHandler = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
  
    if (searchTerm) {
      setIsSearching(true);
  
      const results = words
        .filter((result) => 
          result.startsWith(searchTerm) &&
          !result.includes('-') &&
          !result.includes('.') &&
          !result.includes("'") &&
          result.indexOf(' ') === -1 &&
          result.length >= 4
        )
        .slice(0, 5);
  
      setSearchResults(results);
      setActiveIndex(-1);
      setArrowKeyPressed(false);
    } else {
      setIsSearching(false);
      setSearchResults([]);
      setActiveIndex(-1);
      setArrowKeyPressed(false);
    }
  };
  
  
  const onKeyDownHandler = (event) => {
    if (event.keyCode === 38 && arrowKeyPressed) {
      // up arrow key
      event.preventDefault();
      if (activeIndex === -1) {
        setActiveIndex(searchResults.length - 1);
      } else if (activeIndex === 0 && arrowKeyPressed) {
        setActiveIndex(-1);
      } else {
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
    } else if (event.keyCode === 40 && arrowKeyPressed) {
      // down arrow key
      event.preventDefault();
      if (activeIndex === -1) {
        setActiveIndex(0);
      } else if (activeIndex === searchResults.length - 1) {
        setActiveIndex(-1);
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    } else if (event.keyCode === 13 && arrowKeyPressed) {
      // enter key
      event.preventDefault();
      if (activeIndex > -1) {
        const selectedWord = searchResults[activeIndex];
        props.wordHandle(selectedWord);
        setSearchResults([]);
        setActiveIndex(-1);
        setArrowKeyPressed(false);
        event.target.blur();
        event.target.value = selectedWord;
      }
    } else if (event.keyCode === 38 || event.keyCode === 40) {
      // up or down arrow key pressed
      event.preventDefault();
      setArrowKeyPressed(true);
    }
  };
  
  
return (
    <div ref={wrapperRef}>
      <header
        className={`${classes.header} ${isSearching && classes.headerSearching}`}
      >
        <div className={classes.logo}>
          <img src={ubLogo} alt="University at Buffalo" />
        </div>
        <div className={classes.title} onClick={disableSearch}>
          <h1>Online Dictionary</h1>
        </div>
        <div className={classes.buttonsContainer}>
          <button className={classes.button1}>Add New Word</button>
          <button className={classes.button2}>Statistics</button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.searchBox}>
            <input
              type="text"
              name="word"
              placeholder={"Search For a Word"}
              onChange={onInputChangeHandler}
              onKeyDown={onKeyDownHandler}
              autoComplete="off"
            />
            {searchResults.length > 0 && (
              <div className={classes.searchResultsContainer}>
                <ul className={classes.searchResults}>
                  {searchResults.map((result, index) => (
                    <li
                      key={result}
                      className={
                        index === activeIndex && arrowKeyPressed
                          ? classes.active
                          : ""
                      }
                      onClick={() => {
                        props.wordHandle(result);
                        setSearchResults([]);
                        setActiveIndex(-1);
                        document.getElementsByName("word")[0].value = result;
                      }}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button>Submit</button>
        </form>
      </header>
    </div>
  );
  
}

export default Header