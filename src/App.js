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
      url: "https://github.com/ghcodeiro/fronted-gostack",
      techs: ["ReactJS", "NodeJS", "Express"],
    };
    api.post('/repositories', repository).then((response) => {
      setRepos([...repos, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repos.findIndex((repository) => repository.id === id);

    if (repositoryIndex < 0) {
    }
    api.delete(`repositories/${id}`).then(() => {
      setRepos([
        ...repos.slice(0, repositoryIndex),
        ...repos.slice(repositoryIndex + 1),
      ]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button
              onClick={() => {
                handleRemoveRepository(repository.id);
              }}> Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
