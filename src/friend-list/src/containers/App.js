import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';

//import { addFriend, deleteFriend, starFriend } from '../actions'
import * as reducers from '../reducers'

import FriendListApp from './FriendListApp'

const reducer = combineReducers(reducers)
const store = createStore(reducer)

/*
console.log('store', store.getState());
// ------------------------------------------------
store.dispatch(addFriend('Barack Obama'));
console.log('store add Barack', store.getState());
// ------------------------------------------------
store.dispatch(deleteFriend(1))
console.log('store delete 1', store.getState());
// ------------------------------------------------
store.dispatch(starFriend(4))
console.log('store star 4', store.getState());
*/

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <FriendListApp /> }
        </Provider>

      </div>
    );
  }
}
