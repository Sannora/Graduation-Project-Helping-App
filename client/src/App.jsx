import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Welcome from './Components/Welcome/Welcome';
import SignIn from './Components/SignIn/SignIn';
import LoginContext from './Context/ProfileContext';
import Homepage from './Components/Homepage/Homepage';
import AskForHelp from './Components/AskForHelp/AskForHelp';
import Login from './Components/Login/Login';
import UserProvider from './Context/UserContext';
import Logout from './Components/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <div>404 Not Found.</div>,
  },
  {
    path: "/about-you",
    element: <SignIn />,
  },
  {
    path: "/home/*",
    element: <Homepage />,
  },
  {
    path: "/ask-for-help",
    element: <AskForHelp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  }
]);

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  return (
    <UserProvider>
      <LoginContext.Provider value={{ name, setName, surname, setSurname }}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </UserProvider>
  );
}

export default App;