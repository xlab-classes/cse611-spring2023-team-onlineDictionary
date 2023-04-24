import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNewWordList();
  }, []);

  async function getNewWordList() {
    await fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/getnewwords`)
      .then((response) => response.json())
      .then((result) => {
        result = result.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setData(result);
      });

      
  }

  function acceptRejectWords(postBody) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    };

    fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/adminWord`,
      requestOptions)

       setData((prevState)=>{
        return prevState.filter((item) => item.word !== postBody.word)
       })

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
            <th>Add Meaning</th>
            <th>Accept</th>
            <th>Reject</th>
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
                <button className="accept" onClick={() => acceptRejectWords({word : item.word, state:"accept",meaning:meanings[item.id]})}>Accept</button>
              </td>
              <td>
                <button className="reject" onClick={() => acceptRejectWords({word : item.word, state:"reject",meaning:""})}>Reject</button>
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
