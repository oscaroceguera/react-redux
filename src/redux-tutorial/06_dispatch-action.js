import { createStore, combineReducers } from 'redux'

let userReducer = (state = {}, action) => {
	console.log('userReducer was called with state ', state, 'and action', action);

	switch (action.type) {
		case 'SET_NAME':
			return {
				...state,
				name : action.name
			}
		default:
			return state;

	}
}

let itemsReducer = (state = {}, action) => {
	console.log('itemsReducer was called with state ', state, 'and action', action);

	switch (action.type) {
		case 'ADD_ITEM':
			return [
				...state,
				action.item
			]
		default:
			return state;

	}
}

let reducer = combineReducers({
	user : userReducer,
	items : itemsReducer
})
let store_0 = createStore(reducer)

console.log("\n", '### It starts here')
console.log('store_0 state after initialization : ', store_0.getState());

// To dispatch an action, simply call:
store_0.dispatch({
	type : 'AN_ACTION'
})

// Each reducer is effectively called but since none of our reducers care about this action type,
// the state is left unchanged:

console.log('store_0 state after action AN_ACTION:', store_0.getState())


// But, wait a minute! Aren't we supposed to use an action creator to send an action? We could indeed
// use an actionCreator but since all it does is return an action it would not bring anything more to
// this example. But for the sake of future difficulties let's do it the right way according to
// flux theory. And let's make this action creator send an action we actually care about:
let setNameActionCreator = (name) => {
	return {
		type : 'SET_NAME',
		name : name
	}
}

store_0.dispatch(setNameActionCreator('bob'))

console.log('store_0 state after action SET_NAME:', store_0.getState())
