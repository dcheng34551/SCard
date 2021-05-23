import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditPage from './components/Pages/EditPage';
import './Utils/firebase';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route
                        path="/edit/:id"
                        render={(props) => <EditPage {...props} />}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
