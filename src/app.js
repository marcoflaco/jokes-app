import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './Pages/App/App';
import Favourites from './components/Favourites/Favourites';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />

            <Route path="/favourites" component={Favourites} />
        </div>
    </Router>,
    document.getElementById('app')
);
