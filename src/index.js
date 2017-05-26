//react imports
import React from 'react';
import ReactDOM from 'react-dom';

//redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';

//react router imports
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//styles
import './style/style.css';

//components
import PostsIndex from './components/posts_index'
import PostsNew from './components/posts_new'



const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//switch uses most specific route that matches, top down.

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
