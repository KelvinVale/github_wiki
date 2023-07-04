import React  from 'react';
import logo from './assets/github_logo.png';
import {useState} from 'react'
import './App.css';

import axios from 'axios';
import { RepoDisplay } from "./components/RepoDisplay";

function App() {
  const [digitado, digitadoSet] = useState('');
  const [repos, reposSet] = useState([]);

  const api = axios.create({ baseURL: 'https://api.github.com' })

  const apiHandle = async () => {
    const {data} = await api.get(`repos/${digitado}`)
    
    if (data.id) {
      const exist = repos.find( repo => (repo.id === data.id) );
      if ( exist ) {
        alert('Repositório já adicionado');
      } else {
        reposSet(prev => [...prev, data]);
      }
      digitadoSet('');
    } else {
      alert('Repositório não encontrado');
    }

  }

  const RemoveById = (currentId) => {
    console.log(currentId);
    reposSet(repos.filter( (repo) => {return repo.id !== currentId}));
  }
  
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <input 
          name='repo' 
          placeholder='Nome do Repositório' 
          value={digitado} 
          onChange={event => digitadoSet(event.target.value)}
        />
        <button className='add-button' onClick={apiHandle}>Adicionar</button>

        <hr/>

        {repos.length ? (
            <div className='repositorio-div'>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repo => (
                <RepoDisplay title={repo.name} description={repo.description} link={repo.html_url} removeFunc={RemoveById} id={repo.id}/>
              ))}
            </div>
        ):null}


    </div>

  );
}

export default App;
