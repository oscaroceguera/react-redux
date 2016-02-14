// As you can see above, a middleware is made of 3 nested functions (that will get called sequentially):
// 1) The first level provide the dispatch function and a getState function (if your
//     middleware or your action creator needs to read data from state) to the 2 other levels
// 2) The second level provide the next function that will allow you to explicitly hand over
//     your transformed input to the next middleware or to Redux (so that Redux can finally call all reducers).
// 3) the third level provides the action received from the previous middleware or from your dispatch
//     and can either trigger the next middleware (to let the action continue to flow) or process
//     the action in any appropriate way.

// Those of you who are trained to functional programming may have recognized above an opportunity
// to apply a functional pattern: currying (if you aren't, don't worry, skipping the next 10 lines
// won't affect your redux understanding). Using currying, you could simplify the above function like that:
/*
    // "curry" may come any functional programming library (lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // your middleware-specific code goes here
        )
    );
*/

// The middleware we have to build for our async action creator is called a thunk middleware and
// its code is provided here: https://github.com/gaearon/redux-thunk.
// Here is what it looks like (with function body translated to es5 for readability):

let thunkMiddleware = ({dispatch, getState}) => {
	console.log('Enter thunkMiddleware');
	return (next) => {
		console.log('Function "next" provided: ', next);
		return (action) => {
			console.log('Handling action : ', action);
			return typeof action === 'function' ? action(dispatch, getState) : next(action)
		}
	}
}

import { createStore, combineReducers, applyMiddleware } from 'redux'

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// For multiple middlewares, write: applyMiddleware(middleware1, middleware2, ...)(createStore)

let reducer = combineReducers({
	speaker : (state = {}, action) => {
		console.log('speaker was called with state ', state, 'and action ', action);

		switch (action.type) {
			case 'SAY':
				return {
					...state,
					message : action.message
				}
			default:
				return state
		}
	}
})

const store_0 = finalCreateStore(reducer)

function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}
