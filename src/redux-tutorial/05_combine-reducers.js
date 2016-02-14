import { createStore, combineReducers } from 'redux'

let userReducer = (state = {}, action) => {
	console.log('userReducer was called with state ', state, 'and action', action);

	switch (action.type) {
		case 'SAY_SOMETHING':
			return {
				...state,
				message : action.value
			}
		default:
			return state;

	}
}

let itemsReducer = (state = {}, action) => {
	console.log('itemsReducer was called with state ', state, 'and action', action);

	switch (action.type) {
		case 'DO_SOMETHING':
			return {
				...state,
				message : action.value
			}
		default:
			return state;

	}
}

let reducer = combineReducers({
	user : userReducer,
	items : itemsReducer
})


let store_0 = createStore(reducer)

console.log('store_0 state after initialization : ', store_0.getState());
