import './App.css';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState();
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ""){
      alert("PREENCHA ALGUM CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("");
    } catch {
      alert("OPS, ALGUMA COISA DEU ERRADO")
      setInput("")
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..." 
        value={input}
        onChange={(evento) => setInput(evento.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#f1f1f1"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}-{cep.uf}</span>
        </main>
      )};

      

    </div>
  );
}

export default App;
