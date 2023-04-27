import React, { useState, useEffect } from "react";
import classes from "./AdminVerification.css";

const AdminVerification = () => {
  const [data, setData] = useState([]);
  const [modalWord, setWord] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [rejectedWords, setRejectedWords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [meanings, setMeanings] = useState({});
  const [newWord, setNewWord] = useState({ word: "", meaning: "" });
  const [showMeaning, setShowMeaning] = useState(false);
  const [wordToShow, setWordToShow] = useState("");

  const [showAddMeaning, setShowAddMeaning] = useState(false); // added state variable
  useEffect(() => {
    getNewWordList();
  }, []);

  async function getNewWordList() {
    await fetch(
      `https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/getnewwords?requestedState=Accepted`
    )
      .then((response) => response.json())
      .then((result) => {
        result = result.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setData(result);
      });
  }

  function handleAddMeaningSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: event.target.elements.word.value,
        pos: event.target.elements.pos.value,
        meaning: event.target.elements.meaning.value,
        example: event.target.elements.example.value,
        state: "add",
        
      }),
    };

    fetch(
      `https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/adminWord`,
      requestOptions
    );

    setData((prevState) => {
      return prevState.filter((item) => item.word !== event.target.elements.word.value);
    });

    // added code to show modal for adding new meaning
    
    setShowModal(false);
    
  }

  const handleAccept = (id, wordGiven) => {
    console.log(wordGiven);
    setWord(wordGiven);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const handleShowMeaning = (word) => {
    setShowMeaning(true);
    setWordToShow(word);
  };

  const handleCloseMeaning = () => {
    setShowMeaning(false);
    setWordToShow("");
  };



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Final Accept</th>
            <th>Show Meaning</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.word}</td>
              <td>
                <button
                  className="accept"
                  onClick={() => handleAccept(item.id, item.word)}
                >
                  Final Accept
                </button>
              </td>
              <td>
                <button
                  className="show-meaning-button"
                  onClick={() => handleShowMeaning(item.word)}
                >
                  Show meaning
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMeaning && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseMeaning}>
              &times;
            </span>
            <iframe
              title={wordToShow}
              src={`https://www.dictionary.com/browse/${wordToShow}`}
            />
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content1">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form className={classes.form} onSubmit={handleAddMeaningSubmit}>
              <label htmlFor="word">Word:</label>
              <input type="text" id="word" name="word" value={modalWord} />
              <label htmlFor="POS">Part of Speech:</label>
              <input type="text" id="pos" name="POS" />
              <label htmlFor="meaning">Meaning:</label>
              <input type="text" id="meaning" name="meaning" />
              <label htmlFor="example">Example Usage:</label>
              <input type="text" id="example" name="example" />
              <button type="submit">Add Meaning</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerification;
