import React, { useState, useEffect } from "react";
import COLORS_ARRAY from "./colorsArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faTwitter);

let quotesDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function QuoteMachine() {
  const [text, setText] = useState(
    "If the wind will not serve, take to the oars."
  );
  const [author, setAuthor] = useState("Latin Proverb");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#EF5350");

  const fetchQuotes = async (quotesDBUrl) => {
    const response = await fetch(quotesDBUrl);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quotesDBUrl);
  }, []);

  const handleClick = () => {
    let randomIndex = Math.floor(Math.random() * quotesArray.length);
    setAccentColor(COLORS_ARRAY[randomIndex]);
    setText(quotesArray[randomIndex].quote);
    setAuthor(quotesArray[randomIndex].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ background: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <p id="text">
            <FontAwesomeIcon icon="fa-solid fa-quote-left" size="2x" /> {text}
          </p>
          <p id="author">― {author}</p>
          <div className="buttons">
            <a
              href={encodeURI(
                `http://www.twitter.com/intent/tweet?text=${text} -${author}`
              )}
              id="tweet-quote"
              style={{ background: accentColor }}
            >
              <FontAwesomeIcon icon={faTwitter} className="tweet-icon" />
            </a>
            <button
              id="new-quote"
              onClick={handleClick}
              style={{ background: accentColor }}
            >
              New Quote
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default QuoteMachine;
