import { createStore } from 'redux'

let reducer_0 = (state, action) => {
	console.log('reducer_0 was called with state ', state, 'and action', action);
}

var store_0 = createStore(reducer_0)

// To get the state that Redux is holding for us, you call getState

console.log('store_0 state after initialization: ', store_0.getState());

// Output: store_0 state after initialization: undefined

// -----------------------------------------------------------------------------
// Let's try to send an initial state of our application if the state given to reducer is undefined:

let reducer_1 = (state, action) => {
	console.log('reducer_1 was called with state ', state, 'and action ', action);
	if (typeof state === 'undefined') {
		return {}
	}

	return state;
}

let store_1 = createStore(reducer_1)
// Output: reducer_1 was called with state undefined and action { type: '@@redux/INIT' }


console.log('store_1 satete after initialization : ', store_1.getState());
// Output: store_1 state after initialization: {}

// -----------------------------------------------------------------------------
// As expected, the state returned by Redux after initialization is now {}

// There is however a much cleaner way to implement this pattern thanks to ES6:
let reducer_2 = (state = {}, action) => {
	console.log('reducer_2 was called with state', state, 'an action', action);
	return state;
}

let store_2 = createStore(reducer_2);
// Output: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState());
// Output: store_2 state after initialization: {}

// -----------------------------------------------------------------------------
// Let's now recall that a reducer is only called in response to an action dispatched and
// let's fake a state modification in response to an action type 'SAY_SOMETHING'

let reducer_3 = (state = {}, action) => {
	console.log('render_3 was called with state : ', state, 'and action ', action);

	switch (action.type) {
		case 'SAT_SOMETHING':
			return {
				...state,
				message : action.value
			}
		default:
			return state;

	}
}


let store_3	= createStore(reducer_3)

console.log('store_3 state after initialization : ', store_3.getState());
