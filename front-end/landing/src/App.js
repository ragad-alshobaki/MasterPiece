import React, { useState, useEffect } from 'react';
import ImportRouter from './components/Router';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App">
    {/* Spinner Start */}
    {loading && (
    <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-secondary" style={{ width: "3rem", height: "3rem" }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    )}
    {/* Spinner End */}

    <ImportRouter />
    
    {/* {!loading && (
    <>
    <h1 id='test'>Try again!!!</h1>
    </>
  )} */}
  </div>
  );
}

export default App;
