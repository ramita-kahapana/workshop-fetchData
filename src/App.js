import React, { useState } from "react";
import "./styles.css";

const GITHUB_API_ROOT = "https://api.github.com";
async function fetchData() {
  const response = await fetch(`${GITHUB_API_ROOT}/repos/facebook/react`);
  //  const JSONreponse = await response.json()
  //  return JSONreponse;
  return response.json();
}

export default function App() {
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleFetchClick = async () => {
    setLoading(true);
    try {
      const githubResponse = await fetchData();
      console.log(githubResponse);
      setRepoData(githubResponse);
    } catch {
      setError("There are somthing wrong,pleas try again later"); //setError(err);
    }
    setLoading(false);
  };
  return (
    <div>
      <div>
        <button onClick={handleFetchClick}>Fetch Data</button>
      </div>
      {!isLoading && repoData && (
        <div>
          <h3>{repoData.full_name}</h3>
          <span>{repoData.stargazers_count}</span>
        </div>
      )}
    </div>
  );
}
