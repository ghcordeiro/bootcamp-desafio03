import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `New repository ${Date.now()}`,
      url:"https://github.com/ghcodeiro/fronted-gostack",
      techs: ["ReactJS", "NodeJS", "Express"],
    };
    api.post('/repositories', repository).then((response) => {
      setRepos([...repos, response.data.repo]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const updatedRepos = repos.filter(repo => repo.id !== id);

    setRepos(updatedRepos);
  }

  return (
    <div>
      {repos.map((repo) => (
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button>
        </li>
      ))}

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
