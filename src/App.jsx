import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {DebounceInput} from 'react-debounce-input';

function App() {
  const [inputName, setInputName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!inputName.trim()) return; // avoid calling API with empty query
    getBookName(inputName);
  }, [inputName]);

  const handleInput = (e) => {
    setInputName(e.target.value);
  };

  const getBookName = async (textInput) => {
    try {
      const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${textInput}`);
      setSearchResult(result.data.items);
      console.log(result.data.items);
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <DebounceInput 
        type="text" 
        className="search"
        placeholder="Enter something here..."
        ebounceTimeout={500}
        onChange={handleInput}
      />
        <ul>
          {searchResult.map((item, index) => (
            <li key={index}>{item.volumeInfo.title}</li>
          ))}
        </ul>
    </div>
  );
}

export default App;
