import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('1');
  const [pokemon, setPokemon] = useState('');

  useEffect(() => {
    let mounted = true;

    getPokemon(inputText).then((res) => {
      if (mounted) setPokemon(res.data.forms[0].name);
    });

    return () => (mounted = false);
  }, []);

  function getPokemon(inputText) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${inputText}`);
  }

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    getPokemon(inputText)
      .then((res) => setPokemon(res.data.forms[0].name))
      .catch((err) => setPokemon('Cannot get pokemon'));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-text">Enter a number:</label>
        <input
          type="text"
          id="input-text"
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <p>{pokemon}</p>
    </div>
  );
}

export default App;
