import React, { useState, useEffecct } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import EditPage from './components/Pages/EditPage';
import LoginPage from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';
import './Utils/firebase';

function App() {
    const [currentUser, setCurrentUser] = useState({ email: null });
    const [currentUserTimes, setCurrentUserTimes] = useState(0);

    if (currentUserTimes === 0) {
        firebase.auth().onAuthStateChanged((user) => {
            user ? setCurrentUser(user) : setCurrentUser({ email: 'noUser' });
        });
        setCurrentUserTimes(1);
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route
                        path="/edit/:id"
                        render={(props) => <EditPage {...props} />}
                    />
                    <Route
                        path="/login"
                        render={(props) => (
                            <LoginPage
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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
