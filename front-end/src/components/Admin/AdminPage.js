import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    getNewWordList();
  }, []);

  async function getNewWordList() {
    await fetch(`http://localhost:3001/getWord/getStatistics`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }

  function acceptRejectWords(postBody) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    };

    fetch(`http://localhost:3001/getWord/addNewWord`,
      requestOptions)

  }

  const [acceptedWords, setAcceptedWords] = useState([]);
  const [rejectedWords, setRejectedWords] = useState([]);

  const [meanings, setMeanings] = useState({});

  const [showMeaning, setShowMeaning] = useState(false);
  const [wordToShow, setWordToShow] = useState('');

  const handleAccept = (id) => {
    const wordToAccept = data.find((item) => item.id === id);
    setAcceptedWords([...acceptedWords, wordToAccept]);
  };

  const handleReject = (id) => {
    const wordToReject = data.find((item) => item.id === id);
    setRejectedWords([...rejectedWords, wordToReject]);
  };


  const handleMeaningChange = (id, value) => {
    setMeanings({ ...meanings, [id]: value });
  };


  const handleShowMeaning = (word) => {
    setShowMeaning(true);
    setWordToShow(word);
  };
  
  const handleCloseMeaning = () => {
    setShowMeaning(false);
    setWordToShow('');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>Add Meaning</th>
            <th>Show Meaning</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.word}</td>
              <td>
                <input type="text" value={meanings[item.id] || ''} onChange={(e) => handleMeaningChange(item.id, e.target.value)} />
              </td>
              <td>
                <button className="accept" onClick={() => handleAccept(item.id)}>Accept</button>
              </td>
              <td>
                <button className="reject" onClick={() => handleReject(item.id)}>Reject</button>
              </td>
              <td>
                <button className="show-meaning-button" onClick={() => handleShowMeaning(item.word)}>Show meaning</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMeaning && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseMeaning}>&times;</span>
          <iframe title={wordToShow} src={`https://www.dictionary.com/browse/${wordToShow}`} />
        </div>
      </div>
    )}
  </div>
);
};

export default AdminPage;
