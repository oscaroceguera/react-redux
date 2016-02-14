import { createStore, combineReducers } from 'redux'

let reducer	= combineReducers({
	speaker : (state = {}, action) => {
		console.log('speaker was called with state ', state, 'and action', action);

		switch (action.type) {
			case 'SAY':
				return {
					...state,
					message : action.message
				}
			default:
				return state;
		}
	}
})

var store_0 = createStore(reducer);

var sayActionCreator = (message) => {
	return {
		type : 'SAY',
		message
	}
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())

// ... then we see that our store is updated immediately.

// What we'd like instead is an action creator that looks a bit like this:

let asyncSayActionCreator_1 = (message) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch({
				type : 'SAY',
				message
			})
		}, 2000)
	}
}
