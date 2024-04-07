import React, { createContext,useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({isAuthorized: false})

const AppWrapper = () => {
  // State for authorization status
  const [isAuthorized, setIsAuthorized] = useState(false);

  // State for user data
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
