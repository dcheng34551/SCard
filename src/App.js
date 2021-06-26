import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import EditPage from "./components/Pages/EditPage";
import LoginPage from "./components/Pages/LoginPage";
import MainPage from "./components/Pages/MainPage";
import ShowPage from "./components/Pages/ShowPage";
import SendPage from "./components/Pages/SendPage";
import UndefinedPage from "./components/Pages/undefinedPage";
import "./Utils/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState({ email: null });

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser({ email: "noUser" });
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/edit/:cardId"
            render={(props) => (
              <EditPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/main/:id"
            render={(props) => (
              <MainPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/show/:cardId"
            render={(props) => (
              <ShowPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/send/:id"
            render={(props) => (
              <SendPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <LoginPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/*"
            render={(props) => (
              <UndefinedPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
