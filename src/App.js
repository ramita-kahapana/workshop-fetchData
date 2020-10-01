import React, { useEffect, useState } from "react";
import "./styles.css";

const GITHUB_API_ROOT = "https://api.github.com";
const AVAILABLE_REPOS = ["facebook/react", "angular/angular", "vuejs/vue"];
async function fetchData(repository) {
  const response = await fetch(`${GITHUB_API_ROOT}/repos/${repository}`);
  //  const JSONreponse = await response.json()
  //  return JSONreponse;
  return response.json();
}

export default function App() {
  const [repoList, setRepoList] = useState([]);
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleFetchClick = async () => {
    setLoading(true);
    try {
      const githubResponse = await fetchData();
      setRepoData(githubResponse);
    } catch {
      setError("There are somthing wrong,pleas try again later"); //setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const repoRequestPromises = AVAILABLE_REPOS.map((repo) => fetchData(repo));
    //[Promise<pending>,Promise<pending>,Pomise<pending>]
    Promise.all(repoRequestPromises).then((githubResponse) =>
      setRepoList(githubResponse)
    );

    fetchData("vuejs/vue")
      .then((githubResponse) => setRepoData(githubResponse))
      .catch(() => setError("There are somting wrong,please try again later"))
      .finally(() => setLoading(false));

    return () => {};
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleFetchClick}>Fetch Data</button>
      </div>
      {!isLoading && repoList.length && (
        <div>
          {repoList.map((repo) => (
            <>
              <h3>name: {repoData.full_name}</h3>
              <span>star: {repoData.stargazers_count}</span>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
