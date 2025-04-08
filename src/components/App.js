import React, { useEffect, useState, useMemo } from "react";
import "./../styles/App.css";

const App = () => {
  const [userId, setUserId] = useState(1); // Input for filtering
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch function inside useEffect (based on userId)
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [userId]);

  // useMemo to cache filtered data
  const memoizedPosts = useMemo(() => {
    return data;
  }, [data]);

  return (
    <div>
      <h1>Posts by User</h1>

      <label>Select User ID: </label>
      <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        
        memoizedPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      )
      }
    </div>
  );
};

export default App;
