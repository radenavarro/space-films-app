/* REACT */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
/* CSS */
import './index.css';
/* COMPONENTES */
import App from './App';
import NotFoundError from './containers/notFoundError';
import FilmList from './containers/filmList';
/* REDUX */
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import mainReducer from "./reducers/mainReducer";
const Store = createStore(mainReducer);

const Routes = (
    <BrowserRouter>
        <Provider store={Store}>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/movies" component={FilmList} />
                <Route path='*' component={NotFoundError} />
            </Switch>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(Routes, document.getElementById('root'));
