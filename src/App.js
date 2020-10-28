import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
		});
  }, []);

  async function handleAddRepository() {
    const repository = {
			title: `Repository ${Date.now()}`,
			url: `www.github.com/gui10l1/repositories/${Date.now()}`,
			techs: [
				"React",
				"JS",
				"JSX"
			]
		};

    const response = await api.post("/repositories", repository);

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
		const response = await api.delete(`repositories/${id}`);

		const repositoryIndex = repositories.findIndex(repository => id === repository.id);
		setRepository(repositories.filter(repository => id !== repository.id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
				))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
